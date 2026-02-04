import TutorBookingSection, { TutorProfile } from "@/components/modules/Tutor/TutorBookingSection";
import { studentServices } from "@/services/student.service";

const CreateBookings = async () => {

    const {data} = await studentServices.getAllTutors()
   
    return (
        <div className="flex flex-col gap-6">
            {data.map((tutor: TutorProfile) => <TutorBookingSection key={tutor?.id} tutor={tutor}/>)}
        </div>
    );
};

export default CreateBookings;