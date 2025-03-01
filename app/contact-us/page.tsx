
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { client } from "@/lib/sanity";

export const dynamic = "force-dynamic";

async function getData() { 
    

    const query = `*[_type == "contact"][0]`

    

    const data = await client.fetch(query)

    return data
}

async function ContactUs() {
    const data = await getData()

  
    return ( <div className="min-h-[90vh] w-full flex flex-col justify-center items-center gap-3 px-2   ">

        <div className="text-center text-2xl font-semibold">
            Contact us
        </div>
        <div className="text-muted-foreground text-center">
            Operating hours are between 7am - 10pm . We are humans too !
        </div>
        <div>
            <div className="flex flex-col gap-3">
                <Card className="px-4 py-3">
                    <CardTitle className="text-lg text-secondary">Address</CardTitle>
                    <CardDescription>{data.address}</CardDescription>
                </Card>
                <Card className="px-4 py-3">
                    <CardTitle className="text-lg text-secondary">Phone number</CardTitle>
                    <CardDescription>+65 {data.phone_number}</CardDescription>
                </Card>
                <Card className="px-4 py-3">
                    <CardTitle className="text-lg text-secondary">Email</CardTitle>
                    <CardDescription>{data.email}</CardDescription>
                </Card>
            </div>

            <div>

            </div>
        </div>
        
    </div> );
}

export default ContactUs;