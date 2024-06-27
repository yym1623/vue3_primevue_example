const checkAttach = (fileObj : { atchFileId: string; fileSn: string; fileNm : string }) =>  {
  // downloadFileBtn(fileObj.atchFileId, fileObj.fileSn);

  
  const fileExtension = getFileExtension(fileObj.fileNm);  // 확장자
  console.log(" 파일이름, 확장자 추출 성공! ", fileObj.fileNm + " , " + fileExtension);

  // 파일 확장자 : 'jpg', 'jpeg', 'png', 'bmp', 'gif', 'pdf' 의 경우 => 미리보기
  if (['jpg', 'jpeg', 'png', 'bmp', 'gif', 'pdf'].includes(fileExtension.toLowerCase())) {
      console.log("새창 열고 파일 미리보기 실행 : ", fileObj.fileNm);
      openImagePreview(fileObj.atchFileId, fileObj.fileSn);

  // 파일 확장자 : 'txt', 'xls', 'xlsx', 'ppt', 'pptx', 'docx', 'doc', 'hwp', 'zip' 의 경우 => 다운로드
  } else if (['txt', 'xls', 'xlsx', 'ppt', 'pptx', 'docx', 'doc', 'hwp', 'zip'].includes(fileExtension.toLowerCase())) {
      console.log("파일 다운로드 실행 : ", fileObj.fileNm);
      downloadFileBtn(fileObj.atchFileId, fileObj.fileSn);
  }
};

const getFileExtension = (fileName : string) => {
    console.log("확장자 추출 성공!", fileName);  // type: String
    return fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2);
};

const openImagePreview = (atchFileId : string, fileSn : string) => {
  const params = {
      atchFileId: atchFileId,
      fileSn: fileSn
  }

  // // 로컬, 운영 서버 선언
  let protocol = window.location.protocol; 
  let hostname = window.location.hostname;
  
  // 업로드 파일 경로 검색
  const SelectedImageFile = `${protocol}//${hostname}:9093/SmartOnCloudBeta/api/v1/common_getImage`;

  // 새창 열어 파일 실행
  console.log('파일텍', `${SelectedImageFile}?${jsonToQueryString(params)}`)
  window.open(`${SelectedImageFile}?${jsonToQueryString(params)}`);  
};

const downloadFileBtn = (atchFileId : string, fileSn : string) => {    
  if (atchFileId) {

      const param = {
          atchFileId: atchFileId,
          fileSn: fileSn
      }

      // // 로컬, 운영 서버 선언
      let protocol : string = window.location.protocol;
      let hostname : string = window.location.hostname;
      
      // 업로드 파일 경로 검색
      const FileDownUrl = `${protocol}//${hostname}:9093/SmartOnCloudBeta/cmm/fms/FileDown.do`;

      // 새창 열어 파일 실행
      window.open(`${FileDownUrl}?${jsonToQueryString(param)}`);
  }
};

const jsonToQueryString = (json : { atchFileId : string; fileSn : string }) => {
  return Object.keys(json)
      .map(function(key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
      })
      .join('&');
};


export default checkAttach