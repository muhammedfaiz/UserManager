import { useParams } from "react-router-dom"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import UserEdit from "../../components/admin/UserEdit"

const UserEditPage = () => {
    const params = useParams();
  return (
    <>
    <Header/>
    <UserEdit userId={params.id}/>
    <Footer/>
    </>
  )
}
export default UserEditPage