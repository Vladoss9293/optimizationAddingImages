function addImgForLazyLoading(highTarget, src) {
    function addPromiseToImg(path) {
        return new Promise(function (resolve, reject) {
            var img = document.createElement('img');
            img.src = path;
            img.addEventListener('load', function () {
                resolve(img);
            });
            img.addEventListener('error', function () {
                reject(new Error("image: ".concat(path, " load error")));
            });
        });
    }
    function addImage(target) {
        if (target && !imageAdded) {
            var rect = target.getBoundingClientRect();
            console.log('123123');
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
    var imageAdded = false;
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
addImgForLazyLoading(targetLast, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkVTnPAhOLoRmZwK6-m2VsR-SqRu_meVJ9w&s');
