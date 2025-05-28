import { Button } from "@/components/ui/button"

const Content = () => {

    return(
    <div className="flex flex-col items-center justify-center">
        <h1>Mon projet React</h1>
        <h2 className="text-3xl font-bold underline">BIENVENUE!!!!</h2>
     
        <div className="flex flex-col items-center justify-center min-h-svh">
         <Button>Click me</Button>
        </div>
    </div>
    );
};

export default Content;