function Footer() {
    return (
        <section class="py-16">
            <div class="container px-4 mx-auto">
                <div class="flex flex-col lg:flex-row mb-10">
                <a class="inline-block mx-auto mb-10 lg:mb-0 lg:ml-0 lg:mr-auto text-3xl font-semibold leading-none" href="#"><h2>camp.dev</h2></a>
                <ul class="flex lg:flex-row items-center justify-center space-x-12">
                    <li><a class="text-lg font-bold font-heading hover:text-blueGray-600" href="#">Shop</a></li>
                    <li><a class="text-lg font-bold font-heading hover:text-blueGray-600" href="#">About</a></li>
                    <li><a class="text-lg font-bold font-heading hover:text-blueGray-600" href="#">Blog</a></li>
                    <li><a class="text-lg font-bold font-heading hover:text-blueGray-600" href="#">Pricing</a></li>
                </ul>
                </div>
                <div class="flex flex-col lg:flex-row items-center lg:justify-between">
                <p class="text-xs text-blueGray-400">© 2020. All rights reserved.</p>
                <div class="order-first lg:order-last -mx-2 mb-4 lg:mb-0"><a class="inline-block px-2" href="#"><img src="metis-assets/icons/facebook-blue.svg" alt=""/></a><a class="inline-block px-2" href="#"><img src="metis-assets/icons/twitter-blue.svg" alt=""/></a><a class="inline-block px-2" href="#"><img src="metis-assets/icons/instagram-blue.svg" alt=""/></a></div>
                </div>
            </div>
        </section>  
    )
}

export default Footer