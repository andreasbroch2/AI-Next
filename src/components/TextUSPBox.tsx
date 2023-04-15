export default function TextUSPBox() {
    return (
        <section className="bg-lightprimary alignfull">
            <div className="flex flex-col md:flex-row items-center max-w-[1280px] mx-4 md:mx-auto py-8 md:py-16 gap-8">
                <div className="textbox basis-1/2">
                    <h2>Make your life easier by using AI to save time and add value</h2>
                </div>
                <div className="bg-secondary rounded-xl shadow-xl p-6 md:p-12 basis-1/2">
                    <div className="uspbox-item flex items-center">
                        <div className="mr-4 text-3xl">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className="text-white text-xl">
                            <p className="!mb-0">AI-Powered Marketing</p>
                        </div>
                    </div>
                    <div className="uspbox-item flex items-center">
                        <div className="mr-4 text-3xl">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className="text-white text-xl">
                            <p className="!mb-0">Free Resources and Education</p>
                        </div>
                    </div>
                    <div className="uspbox-item flex items-center">
                        <div className="mr-4 text-3xl">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className="text-white text-xl">
                            <p className="!mb-0">Experienced Team</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}