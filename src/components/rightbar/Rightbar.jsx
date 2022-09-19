import React from 'react'
import './Rightbar.css'
// import Online from '../online/Online'

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  const HomeRightbar = () => {
    return (
      <>
        <div className='eventContainer'>
          <img src={PUBLIC_FOLDER +'star.png'} alt='' className='starImg' />
          <span className='eventText'><b>イベントを見る</b></span>
        </div>
        <img src={PUBLIC_FOLDER +'event.jpeg'} alt='' className='eventImg' />
        <h4 className='rightbarTitle'>オンラインの友達</h4>
        <ul className='rightbarFriendList'>
          {/* {user.map((u) => (
            <Online key={u.id} user={u} />
          ))} */}
        </ul>
        <p className='promotionTitle'>
          プロモーション
        </p>
        <img 
         src={PUBLIC_FOLDER + 'promotion/promotion1.jpeg'} 
          alt='' 
          className='rightbarPromotionImg' 
        />
        <p className='promotionName'>
          ショッピング
        </p>
        <img 
          src={PUBLIC_FOLDER + 'promotion/promotion2.jpeg'} 
          alt='' 
          className='rightbarPromotionImg' 
        />
        <p className='promotionName'>
          カーショップ
        </p>
        <img 
          src={PUBLIC_FOLDER + 'promotion/promotion3.jpeg'} 
          alt='' 
          className='rightbarPromotionImg' 
        />
        <p className='promotionName'>
          株式会社Attack
        </p>
      </>
    )
  }

const ProfileRightbar = () => {
    return (
      <>
        <h4 className='rightbarTitle'>ユーザー情報</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>出身：</span>
            <span className='rightbarInfoKey'>福岡</span>
          </div>
          <h4 className='rightbarTitle'>あなたの友達</h4>
          <div className='rightbarFollowings'>
            <div className='rightbarFollowing'>
              <img 
                src={PUBLIC_FOLDER + '/person/1.jpeg'} 
                alt='' 
                className='rightbarFollowingImg' 
              />
              <span className='rightbarFollowingName'>John Doe</span>
            </div>
            <div className='rightbarFollowing'>
              <img 
                src={PUBLIC_FOLDER + '/person/1.jpeg'} 
                alt='' 
                className='rightbarFollowingImg' 
              />
              <span className='rightbarFollowingName'>John Doe</span>
            </div>
            <div className='rightbarFollowing'>
              <img 
                src={PUBLIC_FOLDER + '/person/1.jpeg'} 
                alt='' 
                className='rightbarFollowingImg' 
              />
              <span className='rightbarFollowingName'>John Doe</span>
            </div>
            <div className='rightbarFollowing'>
              <img 
                src={PUBLIC_FOLDER + '/person/1.jpeg'} 
                alt='' 
                className='rightbarFollowingImg' 
              />
              <span className='rightbarFollowingName'>John Doe</span>
            </div>
            <div className='rightbarFollowing'>
              <img 
                src={PUBLIC_FOLDER + '/person/1.jpeg'} 
                alt='' 
                className='rightbarFollowingImg' 
              />
              <span className='rightbarFollowingName'>John Doe</span>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
      {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  ) 
}
