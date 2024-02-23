import * as S from './style';

function Home() {
  return (
    <div style={S.HomePageContainer}>
        <div style={S.HomeHeaderContainer}>
            Welcome to Climb14er - the Mountaineering App for Colorado's 
            Most Ambitious Adventurers!
        </div>
        <div style={S.HomeImageContainer}>
            <img src="/images/14er-3.jpg" style={S.HomeImage} />
        </div>
        
        <div style={S.AboutContainer}>
          <div style={S.HomeHeaderContainer}>
              About
          </div>
          <div style={S.AboutContainerDetail}>
            This app is intended to help you explore the different 14ers and prepare for your trips. 
            Check out the Explore page to browse the various peaks, and the Plan page when you have a hike in mind.
            Plans include details about the route, weather forecasts, and an estimated risk score.
          </div>
          <div style={S.AboutContainerDetail}>
            Remember, forecasts are subject to change and risk scores do not guarantee that your climb will be successful. 
            Always stay aware of your surroundings, monitor the skies, and don't be afraid to turn back if conditions
            start to turn against you. You can always attempt your summit another day!
          </div>
        </div>
        <div style={S.HomeImageContainer}>
            <img src="/images/14er-4.jpg" style={S.HomeImage} />
        </div>
        <div style={S.HomeHeaderContainer}>
          Happy Trails!
        </div>
    </div>  
  );
}

export default Home;