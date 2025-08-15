import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="mt-8 bg-violet-900 pt-9">
                <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
                    <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
                        {/* Logo & Socials */}
                        <div className="md:w-[316px]">
                            <h1 className="text-white font-extrabold">
                                <span className="text-rose-600">YOUR</span>LOGO
                            </h1>
                            <p className="mt-[18px] text-[15px] font-normal text-white/[80%]">
                                Your one-stop online shop for fashion, electronics, and daily essentials.
                                We bring you quality products at unbeatable prices with fast delivery to your doorstep.
                                Shop smart. Shop secure. Shop with us.
                            </p>
                            <div className="mt-[18px] flex gap-4">
                                <span className='bi bi-facebook text-blue-300 text-2xl'></span>
                                <span className='bi bi-instagram text-red-500 text-2xl'></span>
                                <span className='bi bi-whatsapp text-green-500 text-2xl'></span>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="md:w-[316px] mt-6 md:mt-0">
                            <div className="mt-[23px] flex">
                                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                                    <i className="bi bi-telephone text-white text-xl"></i>
                                </div>
                                <div className="ml-[18px]">
                                    <a href="tel:+916387795500" className="text-white text-[14px] font-medium">+91 6387795500</a>
                                    <p className="text-[12px] font-medium text-white">Support Number</p>
                                </div>
                            </div>
                            <div className="mt-[23px] flex">
                                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                                    <i className="bi bi-envelope text-white text-xl"></i>
                                </div>
                                <div className="ml-[18px]">
                                    <a href="mailto:mishrahimanshuu01@gmail.com" className="text-white text-[14px] font-medium">mishrahimanshuu01@gmail.com</a>
                                    <p className="text-[12px] font-medium text-white">Support Email</p>
                                </div>
                            </div>
                            <div className="mt-[23px] flex">
                                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                                    <i className="bi bi-geo-alt text-white text-xl"></i>
                                </div>
                                <div className="ml-[18px]">
                                    <p className="text-white text-[14px] font-medium">Lucknow, Uttar Pradesh, India, 226201</p>
                                    <p className="text-[12px] font-medium text-white">Address</p>
                                </div>
                            </div>
                        </div>

                        {/* Pages & Download App */}
                        <div className="mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0 md:max-w-[341px]">
                            <div>
                                <p className="text-[18px] font-medium">Pages</p>
                                <ul>
                                    <li className="mt-[15px]"><a href="/" className="hover:opacity-80">Home</a></li>
                                    <li className="mt-[15px]"><a href="/our-tutors" className="hover:opacity-80">News</a></li>
                                    <li className="mt-[15px]"><a href="/become-a-tutor" className="hover:opacity-80">Contact</a></li>
                                    <li className="mt-[15px]"><a href="/plans-and-pricing" className="hover:opacity-80">Plans and pricing</a></li>
                                    <li className="mt-[15px]"><a href="/terms-and-conditions" className="hover:opacity-80">Terms and conditions</a></li>
                                    <li className="mt-[15px]"><a href="/privacy-policy" className="hover:opacity-80">Privacy policy</a></li>
                                </ul>
                            </div>

                            {/* Download App Section */}
                            <div className="mt-6 flex flex-col gap-4 sm:mt-0">
                                <p className="text-[18px] font-medium">Download the app</p>
                                <div className="flex gap-4 sm:flex-col">
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                            alt="Google Play"
                                            className="h-12"
                                        />
                                    </a>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        <img
                                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                            alt="App Store"
                                            className="h-12"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <hr className="mt-[30px] text-white" />
                    <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
                        <p className="text-[10px] md:text-[12px] text-white">
                            © 2024, All Rights Reserved by AllRoundsAid.in
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
