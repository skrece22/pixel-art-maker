$(window).on("load", function() {
  $("button").attr("disabled", "disabled");
});

//Variables
const form = $("form");
const pixelCanvas = $("#pixel_canvas");
const colorPicker = $("#colorPicker");

let gridHeight = document.getElementById("input_height").value;
let gridWidth = document.getElementById("input_width").value;
let pixelSize = document.getElementById("input_pixel").value;
let color = document.getElementById("colorPicker").value;

let mouseDown = false;
let borderRemoved = false;
let eraserOn = false;

//Setting default Color for colorPickers
colorPicker.val("#aabbcc");
$("#bgColor").val("#fcfc10");

//Colorpicker Listener
colorPicker.change(function(evt) {
  if (!eraserOn) {
    color = evt.target.value;
  } else {
    resetEraser();
  }
});

// Mouse Listeners for performing drawing
pixelCanvas.on("mousedown", "td", function(evt) {
  evt.preventDefault();
  $(evt.target).css("background-color", color);
  mouseDown = true;
});

$("html").on("mouseup", function(evt) {
  mouseDown = false;
});

pixelCanvas.on("mouseover", "td", function(evt) {
  if (mouseDown) {
    $(evt.target).css("background-color", color);
  }
});

// Adding or Removing border
$(".border").click(function() {
  var $this = $(this);
  borderRemoved = !borderRemoved;
  removeBorder();
  if (borderRemoved) {
    $this.text("Add Border");
  } else {
    $this.text("Remove Border");
  }
});

// A function to remove table, td, tr border
function removeBorder() {
  $("td").toggleClass("removedBorder");
  $("table").toggleClass("removedBorder");
  $("tr").toggleClass("removedBorder");
}

// Enable or Disable Eraser
$(".eraser").click(function() {
  var $this = $(this);
  eraserOn = !eraserOn;
  if (eraserOn) {
    color = "#FFFFFF";
    $this.text("Click to Draw!");
  } else {
    color = colorPicker.val();
    $this.text("Click to Erase!");
  }
});

//Form
form.submit(function(evt) {
  evt.preventDefault();
  resetBorder();
  resetEraser();
  gridHeight = evt.target.height.value;
  gridWidth = evt.target.width.value;
  pixelSize = evt.target.pixel.value;
  makeGrid(gridHeight, gridWidth, color);
  setPixelSize();
});

//make grid function
function makeGrid(height, width) {
  pixelCanvas.children().remove();
  let td = "";
  for (let j = 0; j < width; j++) {
    td += "<td></td>";
  }
  for (let i = 0; i < height; i++) {
    pixelCanvas.append(`<tr>${td}</tr>`);
  }
}

//reset border

function resetBorder() {
  $("button").removeAttr("disabled");
  if ($(".border").text() === "Add Border") {
    borderRemoved = false;
    $(".border").text("Remove Border");
    removeBorder();
  }
}

//resetEraser

function resetEraser() {
  if ($(".eraser").text() === "Click to Draw!") {
    eraserOn = false;
    $(".eraser").text("Click to Erase!");
  }
  color = colorPicker.val();
}

//set Pixel size

function setPixelSize() {
  $("tr").css("height", pixelSize);
  $("td").css("width", pixelSize);
}
