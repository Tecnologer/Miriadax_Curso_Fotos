var app = {
	inicio: function(){
		this.iniciaFastClick();
		this.iniciarBotones();
	},
	iniciaFastClick: function(){
		FastClick.attach(document.body);
	},
	iniciarBotones: function(){
		var botones = document.querySelectorAll(".button");
		botones[0].addEventListener("click",function(){
			app.aplicaFiltro("gray");
		});
		botones[1].addEventListener("click",function(){
			app.aplicaFiltro("negative");
		});
		botones[2].addEventListener("click",function(){
			app.aplicaFiltro("sepia");
		});
		botones[3].addEventListener("click",function(){
			app.cargarFoto(Camera.PictureSourceType.CAMERA);
		});
		botones[4].addEventListener("click",function(){
			app.cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
		});
	},
	cargarFoto: function(pictureSourceType){
		var options={
			quality: 50,
			sourceType: pictureSourceType,
			destinationType: Camera.DestinationType.FILE_URI,
			encodingType: Camera.EncodingType.PNG,
			targetWidth: 1080,
			targetHeight: 720,
			correctOrientation: true,
			cameraDirection: navigator.camera.Direction.FRONT,
			saveToPhotoAlbum: true
		};
		navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, options);
	},
	fotoTomada: function(imageURI){
		var imagen = document.createElement("img");
		imagen.onload = function(){
			app.pintarFoto(imagen);
		};

		imagen.src = imageURI;
	},
	pintarFoto: function(img){
		var canvas = document.querySelector("#foto");
		var ctx = canvas.getContext("2d");
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0, img.width, img.height);
	},
	aplicaFiltro: function(filterName){
		var canvas = document.querySelector("#foto");
		var ctx = canvas.getContext("2d");

		imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
		effects[filterName](imageData.data);
		ctx.putImageData(imageData,0,0);
	},
	errorAlTomarFoto: function(msg){
		console.log("Fallo al tomar la foto o toma cancelada: "+msg);
	}
};

if("addEventListener" in document){
	document.addEventListener("DOMContentLoaded", function(){
		app.inicio();
	}, false);
}

// app.inicio();