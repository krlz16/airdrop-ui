import AirdropContainer from './AirdropContainer'

function Content() {
  return (
    <section id='airdrop-content' className="m-auto min-h-screen">
      <div className="w-full border-y border-y-white flex justify-center gap-3 py-6 items-center">
        <h4 className="text-xl font-bold">Airdrops available for claimiming</h4>
      </div>        
      <AirdropContainer />
    </section>
  )
}

export default Content
