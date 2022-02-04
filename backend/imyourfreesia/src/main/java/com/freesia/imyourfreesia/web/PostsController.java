package com.freesia.imyourfreesia.web;

import com.freesia.imyourfreesia.domain.posts.Posts;
import com.freesia.imyourfreesia.service.PostsService;
import com.freesia.imyourfreesia.web.dto.posts.PostsResponseDto;
import com.freesia.imyourfreesia.web.dto.posts.PostsSaveRequestDto;
import com.freesia.imyourfreesia.web.dto.posts.PostsUpdateRequestDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;
import java.util.UUID;

@Api(tags={"freesia Posts API"})
@RequiredArgsConstructor
@Controller
public class PostsController {
    private final PostsService postsService;

    /*게시글 저장*/
    @ResponseBody
    @PostMapping("/post")
    @ApiOperation(value="게시글 저장", notes="게시글 저장 API")
    @ApiImplicitParam(name = "PostsSaveRequestDto", value = "게시글 저장 dto")
    public ResponseEntity<Posts> savePost(@RequestBody PostsSaveRequestDto requestDto) throws Exception{
        return ResponseEntity.ok()
                .body(postsService.save(requestDto));
    }

    /*게시글 리스트 조회*/
    @ResponseBody
    @GetMapping("/posts")
    @ApiOperation(value="게시글 리스트 조회", notes="게시글 리스트 조회 API")
    public ResponseEntity<List<Posts>> list(){
        return ResponseEntity.ok()
                .body(postsService.list());
    }

    /*게시글 상세페이지 조회*/
    @ResponseBody
    @GetMapping("/post")
    @ApiOperation(value="게시글 상세 내용 조회", notes="게시글 상세 내용 조회 API")
    @ApiImplicitParam(name = "pid", value = "게시글 id")
    public ResponseEntity<PostsResponseDto> postView(@RequestParam Long pid){
        return ResponseEntity.ok()
                .body(postsService.findById(pid));
    }

    /*게시글 수정*/
    @ResponseBody
    @PutMapping("/post")
    @ApiOperation(value="게시글 수정", notes="게시글 수정 API")
    @ApiImplicitParam(name = "pid", value = "게시글 id")
    public ResponseEntity<Posts> update(@RequestParam Long pid,
                                        @RequestBody PostsUpdateRequestDto updateRequestDto){
        return ResponseEntity.ok()
                .body(postsService.update(pid, updateRequestDto));
    }

    /*게시글 삭제*/
    @ResponseBody
    @DeleteMapping("/post")
    @ApiOperation(value="게시글 삭제", notes="게시글 삭제 API")
    @ApiImplicitParam(name = "pid", value = "게시글 id")
    public ResponseEntity<?> delete(@RequestParam Long pid){
        postsService.delete(pid);
        return ResponseEntity.noContent().build();
    }
    /* 이미지 업로드 */
    @RequestMapping(value="/imageUpload.do", method = RequestMethod.POST)
    @ApiOperation(value="CK에디터 이미지 업로드", notes="CK에디터 이미지 업로드")
    public void imageUpload(HttpServletRequest request,
                            HttpServletResponse response, MultipartHttpServletRequest multiFile
            , @RequestParam MultipartFile upload) throws Exception{
        // 랜덤 문자 생성
        UUID uid = UUID.randomUUID();

        OutputStream out = null;
        PrintWriter printWriter = null;

        //인코딩
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        try{
            //파일 이름 가져오기
            String fileName = upload.getOriginalFilename();
            byte[] bytes = upload.getBytes();

            //이미지 경로 생성
            String path = "C:\\freesiaImg\\";
            String ckUploadPath = path + uid + "_" + fileName;
            File folder = new File(path);
            System.out.println("path:"+path);	// 이미지 저장경로 console에 확인
            //해당 디렉토리 확인
            if(!folder.exists()){
                try{
                    folder.mkdirs(); // 폴더 생성
                }catch(Exception e){
                    e.getStackTrace();
                }
            }

            out = new FileOutputStream(new File(ckUploadPath));
            out.write(bytes);
            out.flush(); // outputStram에 저장된 데이터를 전송하고 초기화

            String callback = request.getParameter("CKEditorFuncNum");
            printWriter = response.getWriter();
            String fileUrl = "/ckImgSubmit.do?uid=" + uid + "&fileName=" + fileName; // 작성화면

            // 업로드시 메시지 출력
            printWriter.println("{\"filename\" : \""+fileName+"\", \"uploaded\" : 1, \"url\":\""+fileUrl+"\"}");
            printWriter.flush();

        }catch(IOException e){
            e.printStackTrace();
        } finally {
            try {
                if(out != null) { out.close(); }
                if(printWriter != null) { printWriter.close(); }
            } catch(IOException e) { e.printStackTrace(); }
        }
        return;
    }

    /* 서버로 전송된 이미지 뿌려주기 */
    @RequestMapping(value="/ckImgSubmit.do")
    @ApiOperation(value="프론트가 신경 안 써도 되는 부분 ", notes="CK에디터 서버로부터 이미지 받기 API")
    public void ckSubmit(@RequestParam(value="uid") String uid
            , @RequestParam(value="fileName") String fileName
            , HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{

        //서버에 저장된 이미지 경로
        String path = "C:\\freesiaImg\\";	// 저장된 이미지 경로
        System.out.println("path:"+path);
        String sDirPath = path + uid + "_" + fileName;

        File imgFile = new File(sDirPath);

        //사진 이미지 찾지 못하는 경우 예외처리로 빈 이미지 파일을 설정한다.
        if(imgFile.isFile()){
            byte[] buf = new byte[1024];
            int readByte = 0;
            int length = 0;
            byte[] imgBuf = null;

            FileInputStream fileInputStream = null;
            ByteArrayOutputStream outputStream = null;
            ServletOutputStream out = null;

            try{
                fileInputStream = new FileInputStream(imgFile);
                outputStream = new ByteArrayOutputStream();
                out = response.getOutputStream();

                while((readByte = fileInputStream.read(buf)) != -1){
                    outputStream.write(buf, 0, readByte);
                }

                imgBuf = outputStream.toByteArray();
                length = imgBuf.length;
                out.write(imgBuf, 0, length);
                out.flush();

            }catch(IOException e){
                e.printStackTrace();
            }finally {
                outputStream.close();
                fileInputStream.close();
                out.close();
            }
        }
    }
}
