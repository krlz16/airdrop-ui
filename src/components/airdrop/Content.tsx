import AirdropContainer from './AirdropContainer'

function Content() {
  return (
    <section id='airdrop-content' className="m-auto min-h-screen">
      <div className="w-full border-y border-y-white flex justify-center gap-3 py-8 mb-10 items-center">
        <span className="w-max bg-gray-700 text-white text-xs rounded-full px-2 font-semibold leading-none py-1 h-max flex justify-center items-center">01</span>
        <h4 className="text-xl font-bold">Airdrops available for claimiming</h4>
      </div>        
      <AirdropContainer />
    </section>
  )
}

export default Content
