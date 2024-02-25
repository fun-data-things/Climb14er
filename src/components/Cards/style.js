const ExploreTrailCard = {
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    border: '1px solid black',
    borderRadius: '6px',
    width: '500px',
    padding: '16px',
    margin: '18px',
};

const ExploreTrailContainer = {
    display: 'flex',
    justifyContent: 'space-around'
};

const PlanTrailContainer = {
    border: '1px solid black',
    borderRadius: '6px',
    width: '95%',
    padding: '12px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    marginTop: '12px',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-around'
};

const MapContainerStyleExplore = {
    width: '250px',
    height: '300px'
};

const MapContainerStylePlan = {
    width: '300px',
    height: '450px'
  };

const TemperatureContainer = {
    border: '1px solid black',
    borderRadius: '6px',
    width: '95%',
    padding: '12px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
}

const PrecipContainer = {
    border: '1px solid black',
    borderRadius: '6px',
    width: '95%',
    padding: '12px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
}

const RiskContainer = {
    border: '1px solid black',
    borderRadius: '6px',
    width: '95%',
    padding: '12px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
};

const RiskTitle = {
    display: 'block',
    fontSize: '30px',
    color: 'orange'
};

const FormatRiskTitle = (color) => {
    return {
        display: 'block',
        fontSize: '30px',
        fontWeight: '600',
        color
    }
};

const CardTitle = {
    fontWeight: '600',
    fontSize: '22px'
};

const CardDetails = {
    padding: '8px',
    fontSize: '16px'
};

const CardLabel = {
    fontWeight: '500'
};

const ButtonContainer = {
    margin: '12px'
};

export {
    ExploreTrailCard,
    ExploreTrailContainer,
    PlanTrailContainer,
    MapContainerStyleExplore,
    MapContainerStylePlan,
    CardTitle,
    CardDetails,
    CardLabel,
    TemperatureContainer,
    PrecipContainer,
    RiskContainer,
    RiskTitle,
    FormatRiskTitle,
    ButtonContainer
};