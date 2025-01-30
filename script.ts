function addImgForLazyLoading (highTarget: HTMLDivElement | null, src: string): void {
    function addPromiseToImg(path: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            img.src = path;
    
            img.addEventListener('load', () => {
                resolve(img);
            });
    
            img.addEventListener('error', () => {
                reject(new Error(`image: ${path} load error`));
            })
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
    
    let imageAdded: boolean = false;
    
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

addImgForLazyLoading(targetLast, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvkVTnPAhOLoRmZwK6-m2VsR-SqRu_meVJ9w&s');