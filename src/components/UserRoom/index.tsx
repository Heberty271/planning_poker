import backgroundImg from './images/urokodaki.jpg'
import backgroundImg2 from './images/tomioka.jpg'

export function UserRoom({ user }: any) {
  
  return (
    <div className="fex-col-center">
      {/*
        <div className="flex-center">
        <img src={user.avatar} alt="" className="rounded-full w-12 h-12" />
        </div>
      */}
      <div className="mt-4 flex-center rounded-lg w-14 h-24 bg-gray-300 shadow-lg">        
        {user.voted
          ? <img src={backgroundImg} alt="" className="rounded-lg w-14 h-24" />
          : <img src={backgroundImg2} alt="" className="rounded-full w-6 h-6" />
        }
      </div>
      <div className="flex-center mt-2 gap-1 mobile:my-1">
        <span className="font-semibold text-lg mobile:text-sm">{user.nickname}</span>
      </div>
    </div>
  )
}