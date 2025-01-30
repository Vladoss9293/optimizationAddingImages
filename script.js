function addImgForLazyLoading(highTarget, src, highImgTarget) {
    var imageAdded = false;
    function addPromiseToImg(path) {
        return new Promise(function (resolve, reject) {
            if (highImgTarget) {
                highImgTarget.src = path;
                highImgTarget.addEventListener('load', function () {
                    resolve(highImgTarget);
                });
                highImgTarget.addEventListener('error', function () {
                    reject(new Error("image: ".concat(path, " load error")));
                });
            }
            else {
                reject(new Error("image: ".concat(highImgTarget, " not found")));
            }
        });
    }
    function addImage(target) {
        if (target && !imageAdded) {
            var rect = target.getBoundingClientRect();
            console.warn('>> scroll tracking <<');
            if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth) {
                imageAdded = true;
                addPromiseToImg(src).then(function (img) {
                    document.body.appendChild(img);
                    document.removeEventListener('scroll', onScroll);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
    function onScroll() {
        if (highTarget) {
            addImage(highTarget);
        }
    }
    if (highTarget) {
        document.addEventListener('scroll', onScroll);
    }
}
var targetLast = document.querySelector('#targetLastBlock');
var lazyLoad__Img = document.querySelector('#lazyLoad__Img');
addImgForLazyLoading(targetLast, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkVTnPAhOLoRmZwK6-m2VsR-SqRu_meVJ9w&s', lazyLoad__Img);
