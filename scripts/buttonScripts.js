var arrayArtist = [];
var arrayName = [];
var arrayLoc = [];
var arrayDate = [];
var arrayImg = [];
var arrayPeriod = [];
var arrayPeriodColor = [];
var arrayPeriodTxtColor = [];
var currentImg = "";
var savedObj = "";
var savedPObj = "";
var displayPeriod = false;
var totalSubmissions = 0;
var isOpen = true;
var currentlyOpen = 0;
var database = firebase.database();
function submit() {
    if (txtSearch2.value === "") {
        var modal = document.getElementById('errorPopup');
        modal.style.display = "block";
    } else {
        savedObj = "";
        savedPObj = "";
        savedOObj = "";
        updateVal();
        for (var i = 0; i <= arrayName.length - 1; i++) {
            savedObj = savedObj + "<button title=\"Select Artwork\" id=\"imageButtonID\" onclick=\"openArt(" + i + ");\">" + arrayName[i] + "</button>"
            savedOObj = savedOObj + "<option value=\"" + arrayName[i] + "\">";
        }
        for (var i = 0; i <= arrayName.length - 1; i++) {
            if (arrayPeriod[i] !== "") {
                var colorTMP = "#ffffff";
                var textColor = 'black';
                var hexVersion = "#" + ((1 << 24) * Math.random() | 0).toString(16);
                hexVersion = hexVersion.replace('#', '');
                var rgb = [parseInt(hexVersion.substring(0, hexVersion.length / 3), 16), parseInt(hexVersion.substring(hexVersion.length / 3, 2 * hexVersion.length / 3), 16), parseInt(hexVersion.substring(2 * hexVersion.length / 3, 3 * hexVersion.length / 3), 16)];
                if (arrayPeriodColor[i] !== "") {
                    colorTMP = arrayPeriodColor[i];
                    textColor = arrayPeriodTxtColor[i];
                } else {
                    colorTMP = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                    var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
                    if (o > 125) {
                        textColor = 'black';
                    } else {
                        textColor = 'white';
                    }
                }
                savedPObj = savedPObj + "<button title=\"Select Period\" id=\"periodBankButton\" onclick=\"periodFilter('" + arrayPeriod[i] + "');\" style=\"background:" + colorTMP + ";color:" + textColor + ";\"><span id=\"periodText\">" + arrayPeriod[i] + "</span></button>&nbsp;"
                displayPeriod = true;
                arrayPeriodColor[i] = colorTMP;
                arrayPeriodTxtColor[i] = textColor;
            }
        }
        if (displayPeriod) {
            var pBank = document.getElementById("periodSection");
            pBank.style.visibility = "visible";
        }
        $("#periodBank").html("<div id=\"periodBank\"><button title=\"Select Period\" id=\"periodBankButton\" onclick=\"periodFilter('none');\" style=\"background:#be2f2f;\">None</button>&nbsp;" + savedPObj);
        $("#objectArray").html("<div id=\"objectArray\" align=\"center\">" + savedObj + "</div>");
        $("#allArt").html("<datalist id=\"allArt\">" + savedOObj + "</datalist>");
        var fNotif = document.getElementById("firstNotif");
        fNotif.style.visibility = "hidden";
        clearField();
        clearImage();
        totalSubmissions++;
        var searchBar = document.getElementById("searchContainer");
        searchBar.style.visibility = "visible";
        save();
    }
}
function clearField() {
    document.getElementById('txtSearch1').value = '';
    document.getElementById('txtSearch2').value = '';
    document.getElementById('txtSearch3').value = '';
    document.getElementById('txtSearch4').value = '';
    document.getElementById('txtSearch5').value = '';
}
function clearImage() {
    document.getElementById('selectedImage').src = 'img/icon.png';
    currentImg = "";
}
function closeModal(closeID) {
    if (closeID === 1) {
        var modal = document.getElementById('errorPopup');
        modal.style.display = "none";
    }
    if (closeID === 2) {
        var modal = document.getElementById('artPopup');
        modal.style.display = "none";
    }
    if (closeID === 3) {
        var modal = document.getElementById('changeImg');
        modal.style.display = "none";
    }
}
function openArt(artVal) { //something's wrong in this function (FIX)
    currentlyOpen = artVal;
    var modal = document.getElementById('artPopup');
    modal.style.display = "block";
    if (arrayArtist[artVal] !== "") {
        document.getElementById('artDoc1').value = arrayArtist[artVal];
    } else {
        document.getElementById('artDoc1').value = "";
    }
    if (arrayName[artVal] !== "") {
        document.getElementById('artDoc2').value = arrayName[artVal];
    } else {
        document.getElementById('artDoc2').value = "";
    }
    if (arrayLoc[artVal] !== "") {
        document.getElementById('artDoc3').value = arrayLoc[artVal];
    } else {
        document.getElementById('artDoc3').value = "";
    }
    if (arrayPeriod[artVal] !== "") {
        document.getElementById('artDoc4').value = arrayPeriod[artVal];
    } else {
        document.getElementById('artDoc4').value = "";
    }
    if (arrayDate[artVal] !== "") {
        document.getElementById('artDoc5').value = arrayDate[artVal];
    } else {
        document.getElementById('artDoc5').value = "";
    }
    if (arrayImg[artVal] !== "") {
        document.getElementById('selectedImage2').src = arrayImg[artVal];
    } else {
        document.getElementById('selectedImage2').src = "img/icon.png";
    }
    $("#saveArtID").html("<button title=\"Save Input\" id=\"saveArtID\" onclick=\"saveArt(" + artVal + ");\">Save</button>");
    $("#deleteArtID").html("<button title=\"Remove this piece\" id=\"deleteArtID\" onclick=\"deleteArt(" + artVal + ");\">Delete</button>");
}
function deleteArt(artVal) {
    deleteVal();
    var modal = document.getElementById('artPopup');
    modal.style.display = "none";
    savedObj = "";
    savedPObj = "";
    displayPeriod = false;
    for (var i = 0; i <= arrayName.length - 1; i++) {
        savedObj = savedObj + "<button title=\"Select Artwork\" id=\"imageButtonID\" onclick=\"openArt(" + i + ");\">" + arrayName[i] + "</button>"
    }
    for (var i = 0; i <= arrayName.length - 1; i++) {
        if (arrayPeriod[i] !== "") {
            var colorTMP = "#ffffff";
            var textColor = 'black';
            var hexVersion = "#" + ((1 << 24) * Math.random() | 0).toString(16);
            hexVersion = hexVersion.replace('#', '');
            var rgb = [parseInt(hexVersion.substring(0, hexVersion.length / 3), 16), parseInt(hexVersion.substring(hexVersion.length / 3, 2 * hexVersion.length / 3), 16), parseInt(hexVersion.substring(2 * hexVersion.length / 3, 3 * hexVersion.length / 3), 16)];
            if (arrayPeriodColor[i] !== "") {
                colorTMP = arrayPeriodColor[i];
            } else {
                colorTMP = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
                if (o > 125) {
                    textColor = 'black';
                } else {
                    textColor = 'white';
                }
            }
            savedPObj = savedPObj + "<button title=\"Select Period\" id=\"periodBankButton\" onclick=\"periodFilter('" + arrayPeriod[i] + "');\" style=\"background:" + colorTMP + ";color:" + textColor + ";\"><span id=\"periodText\">" + arrayPeriod[i] + "</span></button>&nbsp;"
            displayPeriod = true;
            arrayPeriodColor[i] = colorTMP;
            arrayPeriodTxtColor[i] = textColor;
        }
    }
    if (displayPeriod) {
        var pBank = document.getElementById("periodSection");
        pBank.style.visibility = "visible";
    } else {
        var pBank = document.getElementById("periodSection");
        pBank.style.visibility = "hidden";
    }
    $("#periodBank").html("<div id=\"periodBank\"><button title=\"Select Period\" id=\"periodBankButton\" onclick=\"periodFilter('none');\" style=\"background:#be2f2f;\">None</button>&nbsp;" + savedPObj);
    $("#objectArray").html("<div id=\"objectArray\" align=\"center\">" + savedObj + "</div>");
    totalSubmissions--;
    if (totalSubmissions === 0) {
        var searchBar = document.getElementById("searchContainer");
        searchBars.style.visibility = "hidden";
    }
    save();
}
function saveArt(artVal) {
    arrayArtist[artVal] = document.getElementById('artDoc1').value;
    arrayName[artVal] = document.getElementById('artDoc2').value;
    arrayLoc[artVal] = document.getElementById('artDoc3').value;
    arrayPeriod[artVal] = document.getElementById('artDoc4').value;
    arrayDate[artVal] = document.getElementById('artDoc5').value;
    arrayImg[artVal] = document.getElementById('selectedImage2').src;
    var modal = document.getElementById('artPopup');
    modal.style.display = "none";
    savedObj = "";
    savedPObj = "";
    for (var i = 0; i <= arrayName.length - 1; i++) {
        savedObj = savedObj + "<button title=\"Select Artwork\" id=\"imageButtonID\" onclick=\"openArt(" + i + ");\">" + arrayName[i] + "</button>"
    }
    for (var i = 0; i <= arrayName.length - 1; i++) {
        if (arrayPeriod[i] != "") {
            var colorTMP = "#ffffff";
            var textColor = 'black';
            var hexVersion = "#" + ((1 << 24) * Math.random() | 0).toString(16);
            hexVersion = hexVersion.replace('#', '');
            var rgb = [parseInt(hexVersion.substring(0, hexVersion.length / 3), 16), parseInt(hexVersion.substring(hexVersion.length / 3, 2 * hexVersion.length / 3), 16), parseInt(hexVersion.substring(2 * hexVersion.length / 3, 3 * hexVersion.length / 3), 16)];
            if (arrayPeriodColor[i] !== "") {
                colorTMP = arrayPeriodColor[i];
            } else {
                colorTMP = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
                if (o > 125) {
                    textColor = 'black';
                } else {
                    textColor = 'white';
                }
            }
            savedPObj = savedPObj + "<button title=\"Select Period\" id=\"periodBankButton\" onclick=\"periodFilter('" + arrayPeriod[i] + "');\" style=\"background:" + colorTMP + ";color:" + textColor + ";\"><span id=\"periodText\">" + arrayPeriod[i] + "</span></button>&nbsp;"
            displayPeriod = true;
            arrayPeriodColor[i] = colorTMP;
            arrayPeriodTxtColor[i] = textColor;
        }
    }
    if (displayPeriod) {
        var pBank = document.getElementById("periodSection");
        pBank.style.visibility = "visible";
    }
    $("#periodBank").html("<div id=\"periodBank\"><button title=\"Select Period\" id=\"periodBankButton\" onclick=\"periodFilter('none');\" style=\"background:#be2f2f;\">None</button>&nbsp;" + savedPObj);
    $("#objectArray").html("<div id=\"objectArray\" align=\"center\">" + savedObj + "</div>");
    save();
}
function searchImage() {
    var keyword = document.getElementById('txtSearch2').value;
    $(document).ready(function () {

        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
                {
                    tags: keyword,
                    tagmode: "any",
                    format: "json"
                },
                function (data) {
                    var image_src = data.items[0]['media']['m'].replace("_m", "_b");
                    document.getElementById('selectedImage').src = image_src;
                    currentImg = image_src;
                });

    });
}
function openChangeImg() {
    var modal = document.getElementById('changeImg');
    modal.style.display = "block";
    document.getElementById("urlField").focus();
}
function submitURL() {
    var sub_URL = document.getElementById('urlField').value;
    var modal2 = document.getElementById('artPopup');
    if (modal2.style.display === "none") {
        document.getElementById('selectedImage').src = sub_URL;
    }
    document.getElementById('selectedImage2').src = sub_URL;
    currentImg = sub_URL;
    var modal = document.getElementById('changeImg');
    modal.style.display = "none";
}
function filterUpdate() {
    savedObj = "";
    var fs = document.getElementById("filterSelect");
    var selectedValue = fs.options[fs.selectedIndex].value;
    if (selectedValue === "none") {
        for (var i = 0; i <= arrayName.length - 1; i++) {
            savedObj = savedObj + "<button title=\"Select Artwork\" id=\"imageButtonID\" onclick=\"openArt(" + i + ");\">" + arrayName[i] + "</button>"
        }
        $("#objectArray").html("<div id=\"objectArray\" align=\"center\">" + savedObj + "</div>");
    }
    if (selectedValue === "artist") {
        var value = document.getElementById("#filterInput")
        for (var i = 0; i <= arrayName.length - 1; i++) {
            if (arrayArtist[i].indexOf(value) > -1) {
                savedObj = savedObj + "<button title=\"Select Artwork\" id=\"imageButtonID\" onclick=\"openArt(" + i + ");\">" + arrayName[i] + "</button>";
            }
        }
        $("#objectArray").html("<div id=\"objectArray\" align=\"center\">" + savedObj + "</div>");
    }
}
function filterAddInput() {
    var fs = document.getElementById("filterSelect");
    var selectedValue = fs.options[fs.selectedIndex].value;
    if (selectedValue === "none" || selectedValue === "date_order" || selectedValue === "date_flexible") {
        $("#filterInput").html("<div id=\"filterInput\"></div>");
    }
    if (selectedValue === "artist") {
        $("#filterInput").html("<div id=\"filterInput\"><input type=\"text\" class=\"txtSearch2\" style=\"width:70%;\" placeholder=\"Enter Artist\"/></div>");
    }
    if (selectedValue === "location") {
        $("#filterInput").html("<div id=\"filterInput\"><input type=\"text\" class=\"txtSearch2\" style=\"width:70%;\" placeholder=\"Enter Location\"/></div>");
    }
}
function periodFilter(periodSel) {
    alert(periodSel);
}
function removeIcon() {
    savedObj = "";
    savedOObj = "";
    var value = document.getElementById('dataSearch').value.toLowerCase();
    if (value === "") {
        for (var i = 0; i <= arrayName.length - 1; i++) {
            savedObj = savedObj + "<button title=\"Select Artwork\" id=\"imageButtonID\" onclick=\"openArt(" + i + ");\">" + arrayName[i] + "</button>"
        }
        $("#objectArray").html("<div id=\"objectArray\" align=\"center\">" + savedObj + "</div>");
    } else {
        for (var i = 0; i <= arrayName.length - 1; i++) {
            var tmp = arrayName[i];
            tmp = tmp.toLowerCase();
            if (tmp.indexOf(value) > -1) {
                savedObj = savedObj + "<button title=\"Select Artwork\" id=\"imageButtonID\" onclick=\"openArt(" + i + ");\">" + arrayName[i] + "</button>";
            }
        }
        $("#objectArray").html("<div id=\"objectArray\" align=\"center\">" + savedObj + "</div>");
    }
}
function openPopup(op) {
    var fNotif = document.getElementById("firstNotif");
    fNotif.style.visibility = "hidden";
    op.classList.toggle("change");
    if (isOpen) {
        var hiddenSection = $('#overlayPanel');
        hiddenSection.fadeIn()
                .css({'display': 'block'})
                .appendTo('body');
        isOpen = false;
    } else {
        var hiddenSection = $('#overlayPanel');
        $(hiddenSection).fadeOut();
        isOpen = true;
    }
}
function login() {
    var arrayArtist_TMP = [localStorage.getItem("arrayArtist")];
    var arrayName_TMP = [localStorage.getItem("arrayName")];
    var arrayLoc_TMP = [localStorage.getItem("arrayLoc")];
    var arrayDate_TMP = [localStorage.getItem("arrayDate")];
    var arrayImg_TMP = [localStorage.getItem("arrayImg")];
    var arrayPeriod_TMP = [localStorage.getItem("arrayPeriod")];
    var arrayPeriodColor_TMP = [localStorage.getItem("arrayPeriodColor")];
    var arrayPeriodTxtColor_TMP = [localStorage.getItem("arrayPeriodTxtColor")];
    displayPeriod = localStorage.getItem("displayPeriod");
    totalSubmissions = localStorage.getItem("totalSubmissions");
    if (arrayArtist_TMP !== "undefined") {
        arrayName = arrayArtist_TMP.toString().split(",");
    }
    if (arrayName_TMP !== "undefined") {
        arrayName = arrayName_TMP.toString().split(",");
    }
    for (var i = 0; i <= totalSubmissions - 1; i++) {
        savedObj = savedObj + "<button title=\"Select Artwork\" id=\"imageButtonID\" onclick=\"openArt(" + i + ");\">" + arrayName[i] + "</button>"
    }
    arrayArtist = arrayArtist_TMP;
    arrayName = arrayName_TMP;
    arrayLoc = arrayLoc_TMP;
    arrayPeriod = arrayPeriod_TMP;
    arrayDate = arrayDate_TMP;
    arrayPeriodColor = arrayPeriodColor_TMP;
    arrayImg = arrayImg_TMP;    
    if (!displayPeriod) {
        for (var i = 0; i <= totalSubmissions; i++) {
            if (arrayPeriod[i] !== "") {
                var colorTMP = "#ffffff";
                var textColor = 'black';
                var hexVersion = "#" + ((1 << 24) * Math.random() | 0).toString(16);
                hexVersion = hexVersion.replace('#', '');
                var rgb = [parseInt(hexVersion.substring(0, hexVersion.length / 3), 16), parseInt(hexVersion.substring(hexVersion.length / 3, 2 * hexVersion.length / 3), 16), parseInt(hexVersion.substring(2 * hexVersion.length / 3, 3 * hexVersion.length / 3), 16)];
                if (arrayPeriodColor[i] !== "") {
                    colorTMP = arrayPeriodColor[i];
                } else {
                    colorTMP = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                    var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
                    if (o > 125) {
                        textColor = 'black';
                    } else {
                        textColor = 'white';
                    }
                }
                if (displayPeriod) {
                    savedPObj = savedPObj + "<button title=\"Select Period\" id=\"periodBankButton\" onclick=\"periodFilter('" + arrayPeriod[i] + "');\" style=\"background:" + colorTMP + ";color:" + textColor + ";\"><span id=\"periodText\">" + arrayPeriod[i] + "</span></button>&nbsp;"
                    arrayPeriodColor[i] = colorTMP;
                    arrayPeriodTxtColor[i] = textColor;
                }
            }
        }
    }
    if (displayPeriod) {
        var pBank = document.getElementById("periodSection");
        pBank.style.visibility = "visible";
    } else {
        var pBank = document.getElementById("periodSection");
        pBank.style.visibility = "hidden";
    }
    $("#periodBank").html("<div id=\"periodBank\"><button title=\"Select Period\" id=\"periodBankButton\" onclick=\"periodFilter('none');\" style=\"background:#be2f2f;\">None</button>&nbsp;" + savedPObj);
    $("#objectArray").html("<div id=\"objectArray\" align=\"center\">" + savedObj + "</div>");
}
function save() {
    localStorage.setItem("arrayArtist", arrayArtist);
    localStorage.setItem("arrayName", arrayName);
    localStorage.setItem("arrayLoc", arrayLoc);
    localStorage.setItem("arrayDate", arrayDate);
    localStorage.setItem("arrayImg", arrayImg);
    localStorage.setItem("arrayPeriod", arrayPeriod);
    localStorage.setItem("arrayPeriodColor", arrayPeriodColor);
    localStorage.setItem("arrayPeriodTxtColor", arrayPeriodTxtColor);
    localStorage.setItem("displayPeriod", displayPeriod);
    localStorage.setItem("totalSubmissions", totalSubmissions);
}
function updateVal() {
    arrayArtist.push(txtSearch1.value);
    arrayName.push(txtSearch2.value);
    arrayLoc.push(txtSearch3.value);
    arrayPeriod.push(txtSearch4.value);
    arrayDate.push(txtSearch5.value);
    arrayPeriodColor.push("");
    arrayImg.push(currentImg);
}
function deleteVal(){
    arrayArtist.splice(artVal, 1);
    arrayName.splice(artVal, 1);
    arrayLoc.splice(artVal, 1);
    arrayPeriod.splice(artVal, 1);
    arrayDate.splice(artVal, 1);
    arrayImg.splice(artVal, 1);
}