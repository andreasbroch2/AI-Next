import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Head from 'next/head';
import Container from '../components/container';
import Header from '../components/header';
import { getNavMenu } from '../lib/api';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import ContactForm from '../components/contactForm';
 
const Page = ({ data, preview = false, menuItems, footerMenuItems }) => {
    const router = useRouter();
    const url = "//dksmarthome.us21.list-manage.com/subscribe/post?u=cf54bb26d48dbc75d737c6030&amp;id=fb6a480747&amp;f_id=00dac2e1f0";
    const CustomForm = ({ status, message, onValidated }) => {
        let email, fname, lname, phone, adresse;
        const submit = () =>
            email &&
            fname &&
            lname &&
            phone &&
            adresse &&
            email.value.indexOf("@") > -1 &&
            onValidated({
                EMAIL: email.value,
                FNAME: fname.value,
                LNAME: lname.value,
                PHONE: phone.value,
                ADRESSE: adresse.value,
            });

        return (
            <div className='form'>
                {status === "sending" && <div style={{ color: "blue" }}>Sender...</div>}
                {status === "error" && (
                    <div
                        style={{ color: "red" }}
                        dangerouslySetInnerHTML={{ __html: message }}
                    />
                )}
                {status === "success" && (
                    <div
                        style={{ color: "green" }}
                        dangerouslySetInnerHTML={{ __html: message }}
                    />
                )}
                <div className="md:grid md:grid-cols-2 gap-4">
                    <input
                        ref={node => (fname = node)}
                        type="text"
                        placeholder="Fornavn"
                    />
                    <input
                        ref={node => (lname = node)}
                        type="text"
                        placeholder="Efternavn"
                    />
                </div>
                <div className="md:grid md:grid-cols-2 gap-4">
                    <input
                        ref={node => (email = node)}
                        type="email"
                        placeholder="Din e-mail"
                    />
                    <input
                        ref={node => (phone = node)}
                        type="number"
                        placeholder="Dit telefonnummer"
                    />
                </div>
                <input
                    ref={node => (adresse = node)}
                    type="text"
                    placeholder="Adresse"
                />
                <div className='text-center'>
                    <button className='btn' onClick={submit}>
                        Send
                    </button>
                </div>
            </div>
        );
    };
    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Indlæser...</div>;
    }
    return (
        <Layout preview={preview} footerMenuItems={footerMenuItems} data={data}>
            <Head>
                <title>Contact Us</title>
            </Head>
            <Container>
                <Header menuItems={menuItems} />
                <div className="container mx-auto my-12 flex flex-col md:flex-row gap-8">
                    <div className="basis-1/2">
                        <h2 className="mb-4">Få et tilbud</h2>
                        <MailchimpSubscribe
                            url={url}
                            render={({ subscribe, status, message }) => (
                                <CustomForm
                                    status={status}
                                    message={message}
                                    onValidated={formData => subscribe(formData)}
                                />
                            )}
                        />
                    </div>
                    <div className="basis-1/2">
                        <h2 className="mb-4">Send en besked</h2>
                        <ContactForm />
                    </div>
                </div>
            </Container>
        </Layout >
    );
};

export default Page;

export async function getStaticProps() {
    const menuItems = await getNavMenu('PRIMARY');
    const footerMenuItems = await getNavMenu('FOOTER');
    return {
        props: {
            menuItems: menuItems,
            footerMenuItems: footerMenuItems,
        },
        /**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
        revalidate: 1,
    };

}
