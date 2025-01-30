function addImgForLazyLoading (highTarget: HTMLDivElement | null, src: string, highImgTarget: HTMLImageElement | null): void {
    let imageAdded: boolean = false;

    function addPromiseToImg(path: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            if (highImgTarget) {
                highImgTarget.src = path;
        
                highImgTarget.addEventListener('load', () => {
                    resolve(highImgTarget);
                });
        
                highImgTarget.addEventListener('error', () => {
                    reject(new Error(`image: ${path} load error`));
                })
            } else {
                reject(new Error(`image: ${highImgTarget} not found`))
            }
        })
    }

    
    function addImage(target: HTMLDivElement): void {
        if (target && !imageAdded) {
            const rect = target.getBoundingClientRect();
            console.warn('>> scroll tracking <<');
            if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth) {
                imageAdded = true;
                addPromiseToImg(src).then(img => {
                    document.body.appendChild(img);
                    document.removeEventListener('scroll', onScroll);
                }).catch((error) => {
                    console.log(error);
                })
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

const targetLast: HTMLDivElement | null = document.querySelector('#targetLastBlock');
const lazyLoad__Img: HTMLImageElement | null = document.querySelector('#lazyLoad__Img');

addImgForLazyLoading(targetLast, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkVTnPAhOLoRmZwK6-m2VsR-SqRu_meVJ9w&s', lazyLoad__Img);