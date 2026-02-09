import Form from "@/components/Employees/Form";

const EmployeeCreatePage = () => {

    return (
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-100px)]">
            <Form payload={
                {
                    title: "Mr.",
                    first_name: "francis",
                    last_name: "gill",
                    full_name: "francis",
                    display_name: "francis",
                    employee_id: 1000,
                    joining_date: null,
                    branch_id: 1,
                    phone_number: "ssdfsfsdfdf",
                    whatsapp_number: "sdfsdfsdf",
                    system_user_id: 1000,
                    department_id: 1,
                    designation_id: 1,
                    rfid_card_number: "sdkjf",
                    gender: "",
                    profile_image_base64: null,

                    nationality: "test",
                    date_of_birth: null,
                    religion: "test",
                    blood_group: "test",
                    marital_status: "test",
                    email: "tes",
                    password: "sdfsfdd"

                }
            } />
        </div>

    );
};

export default EmployeeCreatePage;