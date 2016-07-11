function parseviews() {

  const services = ReSrc.getServices();
  let views = {
    food: {
      title: 'Places to Eat',
      services: []
    },
    clothing: {
      title: 'Clothing',
      services: []
    },
    shelter: {
      title: 'Shelter',
      services: []
    },
    hygiene: {
      title: 'Hygiene',
      services: []
    },
    health: {
      title: 'Health',
      services: services.health
    },
    human: {
      title: 'Resource Centers',
      services: services.human
    },
    tech: {
      title: 'Internet',
      services: services.technology
    }
  }

  ReSrc.orgMatrServ(services.material, views)

}
