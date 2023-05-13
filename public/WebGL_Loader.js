var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullscreenButton = document.querySelector("#unity-fullscreen-button");
var warningBanner = document.querySelector("#unity-warning");

function unityShowBanner(msg, type) {
  function updateBannerVisibility() {
    warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
  }
  var div = document.createElement('div');
  div.innerHTML = msg;
  warningBanner.appendChild(div);
  if (type == 'error') div.style = 'background: red; padding: 10px;';
  else {
    if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
    setTimeout(function() {
      warningBanner.removeChild(div);
      updateBannerVisibility();
    }, 5000);
  }
  updateBannerVisibility();
}
function startEn(){
    // https://www-assets.stumbleguys.com/webgl/live/0_48_0/WebGL.data.unityweb?cache=true
    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/WebGL.loader.js";
    var config = {
      dataUrl: buildUrl + "/WebGL.data.unityweb",
      frameworkUrl: buildUrl + "/WebGL.framework.js.unityweb",
      codeUrl: buildUrl + "/WebGL.wasm.unityweb",
      streamingAssetsUrl: "StreamingAssets",
    //   cacheControl: function(e) {
    //       return e.match(/\.data/) || e.match(/\.bundle/) ? "must-revalidate" : e.match(/\.mp4/) || e.match(/\.wav/) ? "immutable" : "no-store"
    //   },
      companyName: "Kitka Games",
      productName: "Stumble Guys",
      productVersion: "0.48.0",
      showBanner: unityShowBanner,
    };

    // By default Unity keeps WebGL canvas render target size matched with
    // the DOM size of the canvas element (scaled by window.devicePixelRatio)
    // Set this to false if you want to decouple this synchronization from
    // happening inside the engine, and you would instead like to size up
    // the canvas DOM size and WebGL render target sizes yourself.
    // config.matchWebGLToCanvasSize = false;

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      container.className = "unity-mobile";
      // Avoid draining fillrate performance on mobile devices,
      // and default/override low DPI mode on mobile browsers.
      config.devicePixelRatio = 1;
      unityShowBanner('WebGL builds are not supported on mobile devices.');
    } 
    else {
      canvas.style.width = "100%";
      canvas.style.height = "730px";
    }
    loadingBar.style.display = "block";

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
      }).then((unityInstance) => {
        loadingBar.style.display = "none";
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      }).catch((message) => {
        alert(message);
      });
    };
    document.body.appendChild(script);
}


