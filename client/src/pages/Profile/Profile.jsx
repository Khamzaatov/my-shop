import style from './profile.module.sass'
import avatar from '../../assets/images/logo.png'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser } from './../../features/userSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.profile)

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    console.log(user);

    return (
        <div className={style.container}>
            <div className={style.profile}>
                <div className={style.main}>
                    <div className={style.avatar}>
                        <img src={avatar} alt="" />
                    </div>
                    <div className={style.username}>{user.username}</div>
                </div> 
            </div>
        </div>
    );
};

export default Profile;