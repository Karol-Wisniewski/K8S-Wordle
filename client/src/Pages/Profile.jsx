import '../App.scss';
import avatar from '../Utils/avatar.jpg';

function Profile({currentUser}) {
  return (
    <div className="Profile">
        <div className="profile-mid">
          <div className="profile-mid-user">
            <img alt="avatar" src={avatar} />
            <p>{currentUser.username}</p>
            {currentUser.roles.includes('admin') && <p style={{color: "grey"}}>(Admin)</p>}
          </div>
          <div className="profile-mid-stats">
            <p>Statistics</p>
            <div className="profile-mid-stats-top">
              <div className="grid">
                <p>Games played</p>
                <p>0</p>
              </div>
              <div className="grid">
                <p>Games won</p>
                <p>0</p>
              </div>
              <div className="grid">
                <p>Games lost</p>
                <p>0</p>
              </div>
            </div>
            <div className="profile-mid-stats-bottom">
              <div className="grid">
                <p>Games played</p>
                <p>0</p>
              </div>
              <div className="grid">
                <p>Games won</p>
                <p>0</p>
              </div>
              <div className="grid">
                <p>Games lost</p>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Profile;
