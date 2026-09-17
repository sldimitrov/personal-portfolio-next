export default function Projects() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main
                className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                    My Projects
                </h1>
                <div>
                    <h2>Project 1</h2>
                    <p>description</p>
                    <p>tags</p>
                    <p>live link + repo link</p>
                </div>
                <span>Think about using API for here.</span>
            </main>
        </div>
    );
}
