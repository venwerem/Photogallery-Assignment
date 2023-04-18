//jQeury to design the img so it can also be clickable
$(document).ready(function(){
$('#sm-Image img').on({
  mouseover: function(){
    $(this).css({
      'cursor': 'pointer',
      'border': '3px solid orange'
    });
  },
  mouseout: function(){
    $(this).css({
      'cursor': 'default',
      'border': '3px solid black'
    });
  },
  click: function(){
    var imageClick =$(this).attr('src');
    $('#mainImage').attr('src',imageClick)
  }
});


});

let index = 0;
let images = [];
let timeout = 0;
let countdown = null;



// Load image list from file using AJAX
function loadImages() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "JSON.txt", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse JSON response and store image list
        var json = JSON.parse(xhr.responseText);
        images = json.images;
        console.log(images);
        // Show first image in gallery
        showImage(index);
      }
    };
     
    xhr.send();
  }

  // Show specified image in gallery
function showImage(index) {
    clearTimeout(countdown)
    var image = document.getElementById("mainImage");
    image.src = "/images/"+images[index].name;
    timeout = images[index].time;
    countdown = setTimeout(function() {
      showNextImage();
    }, timeout);
    
  }

// Show next image in gallery
function showNextImage() {
    index =  (parseInt(index + 1) ) % parseInt(images.length);
    showImage(index);
  }


// Show previous image in gallery
function showPreviousImage() {
    index = parseInt(index - 1) % parseInt(images.length);
    showImage(index);
  }
  

// Update image list and show first image
function updateImages() {
    loadImages();
    index = 0;
  }



document.getElementById("previous-btn").addEventListener("click",  showPreviousImage);
document.getElementById("next-btn").addEventListener("click", showNextImage);
document.getElementById("update-btn").addEventListener("click", updateImages);

loadImages();




