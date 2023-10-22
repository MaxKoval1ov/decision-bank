import { Footer } from '@components/footer/footer.component';
import { LoginPage } from '@pages/login.page';
import { Route, Routes } from 'react-router-dom';

export function Root() {
    return (
        <>
            {/* <Header /> */}
            <Routes>
                {/* ⬆️ Home route lifted up to the data router */}
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer />
        </>
    );
}
