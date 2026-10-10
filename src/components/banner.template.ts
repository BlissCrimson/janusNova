export function generateAllInklBanner(){
    const allInklBannerRef = document.querySelector('#allInklBanner');
    if (!allInklBannerRef)return
    allInklBannerRef.innerHTML = `
        <!-- Start Partnerprogramm ALL‑INKL.COM -->     
            <a href="https://all-inkl.com/PAC9D43765CD414">       
                <img border="0" src="https://all-inkl.com/banner/all-inkl_banner_185x35_black.gif" alt="ALL-INKL.COM - Webhosting Server Hosting Domain Provider" />
            </a>
        <!-- Ende Partnerprogramm -->
    `
}