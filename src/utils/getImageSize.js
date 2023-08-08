const getImageSize = (file) => {
  var reader = new FileReader();

  //Read the contents of Image File.
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {

    reader.onload = function (e) {

      //Initiate the JavaScript Image object.
      var img = new Image();

      //Set the Base64 string return from FileReader as source.
      img.src = e.target.result;

      //Validate the File Height and Width.
      img.onload = function () {
        // Natural size is the actual image size regardless of rendering.
        // The 'normal' `width`/`height` are for the **rendered** size.
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // Resolve promise with the width and height
        resolve({ width, height });
      };
      // Reject promise on error
        img.onerror = reject;
    };
  })

}

export default getImageSize