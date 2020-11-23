const Env = use('Env');
const DriverImage = use('App/Core/Assets/Drivers/Image');
const DriverYouTube = use('App/Core/Assets/Drivers/YouTube');

module.exports = {
  maxFileSize: Env.get('MAX_FILE_SIZE', 2000),
  
  allowedFiletypes: Env.get('ASSETS_ALLOWED_EXTENSIONS', 'jpg,jpeg,png,pdf,gif,bmp,svg,doc,docx,xls,csv'),
  
  drivers: {
    image: DriverImage,
    youtube:  DriverYouTube,
  }
}