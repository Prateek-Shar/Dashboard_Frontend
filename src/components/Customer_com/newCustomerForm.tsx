import { useState } from "react";
import Form1, { type CustomerFormData } from "./form1";
import Form2 from "./form2";


const NewCustomerForm = () => {

    const defaultForm: CustomerFormData = {
        Customer_name: "",
        Company_name: "",
        Contact_no: "",
        Country: "",
        Email: "",
        Status: "",
        CID: 0,
        Industry: "",
        Social_Media: "",
        Created_at: new Date(),
    };

    const [form, setForm] = useState<CustomerFormData>({ ...defaultForm });
    const [step, setStep] = useState<1 | 2>(1);

    const api = import.meta.env.VITE_PRODUCTION_ADDRESS;

    const submitCustomerToDb = async () => {
        try {
            // Basic required validation (matches backend `/send_customer` checks)
            const missing =
                !form.Customer_name ||
                !form.Email ||
                !form.Contact_no ||
                !form.Company_name ||
                !form.Country ||
                !form.Status;

            if (missing) {
                console.log("Missing required fields");
                return;
            }

            const stats = await fetch(`${api}/get_customer_stats`, {
                method: "GET",
                credentials: "include",
            });

            if (!stats.ok) {
                const t = await stats.text();
                console.log("Error fetching customer stats:", t);
                return;
            }

            const statsData = await stats.json();
            const nextCid = statsData.next_cid;

            const payload = {
                ...form,
                CID: nextCid,
                Created_at: new Date(),
                links: form.Social_Media, // backend expects `links`
            };

            const res = await fetch(`${api}/send_customer`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const t = await res.text();
                console.log("Failed to submit customer:", t);
                return;
            }

            const data = await res.json();
            console.log("Customer saved:", data);

            setForm({ ...defaultForm });
            setStep(1);
        } catch (e) {
            console.log("Submit failed:", e);
        }
    };



    return (   

        <>
        <style>{`
            @keyframes customerFormIn {
                from { opacity: 0; transform: translateX(14px); }
                to { opacity: 1; transform: translateX(0); }
            }
        `}</style>

        <div
            key={step}
            style={{ animation: "customerFormIn 220ms ease-out" }}
            className="will-change-transform"
        >
            {step === 1 && (
                <Form1
                    form={form}
                    setForm={setForm}
                    onNext={() => setStep(2)}
                />
            )}

            {step === 2 && (
                <Form2
                    form={form}
                    setForm={setForm}
                    onSubmit={submitCustomerToDb}
                />
            )}
        </div>
        
        </>
    );
}

export default NewCustomerForm;
