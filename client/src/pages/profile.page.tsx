import { useAuth } from '@hooks/userAuth.hook';
import Person from '@mui/icons-material/Person';
import { BasicPage } from './basic.page';

export const ProfilePage = () => {
    const { user } = useAuth();

    return <BasicPage title={`${user.username} Profile Page`} icon={<Person />} />;
};
