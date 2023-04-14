export default function TextUSPBox() {
    return (
        <section className="bg-lightblue alignfull">
            <div className="md:flex items-center max-w-[1280px] mx-auto py-8 md:py-16">
                <div className="textbox basis-1/2">
                    <h2>Make your life easier by automating you home and everyday life</h2>
                </div>
                <div className="bg-secondary rounded-xl shadow-xl p-6 md:p-12 basis-1/2">
                    <div className="uspbox-item flex items-center">
                        <div className="mr-4 text-3xl">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className="text-white text-xl">
                            <p className="!mb-0">Everything you need to know about smart homes</p>
                        </div>
                    </div>
                    <div className="uspbox-item flex items-center">
                        <div className="mr-4 text-3xl">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className="text-white text-xl">
                            <p className="!mb-0">New content added weekly</p>
                        </div>
                    </div>
                    <div className="uspbox-item flex items-center">
                        <div className="mr-4 text-3xl">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className="text-white text-xl">
                            <p className="!mb-0">Reviews, offers and much more!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}