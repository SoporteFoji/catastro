export function getOrchestra(orchestra) {
  const instructors = [];
  if (orchestra.instructors.length) {
    orchestra.instructors.map((instructor) => {
      const u = getUser(instructor);
      instructors.push(u);
    });
  }

  const cast_members = [];
  if (orchestra.cast_members.length) {
    orchestra.cast_members.map((cast) => {
      const u = getUser(cast);
      cast_members.push(u);
    });
  }

  const newOrchestra = {
    orchestra: {
      orchestra_code: orchestra.orchestra_code,
      orchestra_id: orchestra.id,
      photo: orchestra.photo,
      name: orchestra.name,
      orchestra_type: orchestra.orchestra_type,
      is_active: orchestra.is_active,
      orchestra_status: orchestra.orchestra_status,
      social_networks: orchestra.social_networks || {},
      website: orchestra.website,
      region: orchestra.area ? orchestra.area.province.region : '',
      province: orchestra.area ? orchestra.area.province : '',
      city: orchestra.city,
      area: orchestra.area || '',
      creation_date: orchestra.creation_date,
      registration_date: orchestra.created_date,
      updated_date: orchestra.modified_date,
    },
    coordinator: getUser(orchestra.coordinator),
    director: getUser(orchestra.director),
    instructors,
    cast_members,
    institution: getUser(orchestra.institution),
    legal_representation: getUser(orchestra.institution ? orchestra.institution.legal_representation : null),
    funding: getFunding(orchestra.funding),
    // funding: orchestra.funding,
  };
  return newOrchestra;
}

export function getNewOrchestra() {
  const instructors = [];
  // eslint-disable-next-line no-use-before-define
  const u = getEmptyUser();
  const cast_members = [];
  instructors.push(u);
  cast_members.push(u);
  const newOrchestra = {
    orchestra: {
      orchestra_code: '',
      orchestra_id: 0,
      photo: '',
      name: '',
      orchestra_type: '',
      is_active: '',
      orchestra_status: '',
      social_networks: {},
      website: '',
      region: {"id":"1","name":"Región de Arica y Parinacota","code":"15"},
      province: {},
      city: '',
      area: {},
      creation_date: '',
      registration_date: '',
      updated_date: '',
    },
    coordinator: u,
    director: u,
    instructors,
    cast_members,
    institution: u,
    legal_representation: u,
    funding: '',
  };
  console.log(newOrchestra);
  return newOrchestra;
}

export function getUser(user) {
  let newUser = {};
  if (user !== undefined && user !== null) {
    if (user.personal_information !== undefined && user.personal_information !== null && Object.keys(user.personal_information).length) {
      newUser = {
        id: user.id,
        role: user.role || '',
        students: user.students || '',
        instrument: user.instrument || '',
        first_name: user.personal_information.first_name || '',
        last_name: user.personal_information.last_name || '',
        name: user.personal_information.name || '',
        address: user.personal_information.address || '',
        social_id: user.personal_information.social_id || '',
        gender: user.personal_information.gender || '',
        email: user.personal_information.email || (user.user ? user.user.email : ''),
        phone_number_mobile: user.personal_information.phone_number_mobile || '',
        phone_number_home: user.personal_information.phone_number_home || '',
        birth_date: user.personal_information.birth_date || '',
      };
    } else {
      newUser = {
        id: user.id,
        role: user.role || '',
        students: user.students || '',
        instrument: user.instruemnt || '',
        name: user.name || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        address: user.address || '',
        social_id: user.social_id || '',
        gender: user.gender || '',
        email: user.email || (user.user ? user.user.email : ''),
        phone_number_mobile: user.phone_number_mobile || '',
        phone_number_home: user.phone_number_home || '',
      };
    }
    return newUser;
  }
  return {};
}
export function getCoordinator(coordinator) {
  console.table(coordinator);
  //console.table(coordinator.user);
  const user = getUser(coordinator);
  console.table(coordinator.personal_information);
  //console.table(user);
}
export function getEmptyUser() {
  let newUser = {};
  newUser = {
    id: '',
    role: '',
    students: '',
    instrument: '',
    name: '',
    first_name: '',
    last_name: '',
    address: '',
    social_id: '',
    gender: '',
    email: '',
    phone_number_mobile: '',
    phone_number_home: '',
  };

  return newUser;
}

export function getAdministrator(user) {
  let newUser = {};
  if (user !== undefined && user !== null) {
    console.log('hhhh');
    if (user.personal_information !== undefined && user.personal_information !== null && Object.keys(user.personal_information).length) {
      newUser = {
        id: user.id,
        user: {
          id: user.user.id || null,
          username: user.user.username || null,
          email: user.user.email || null,
        },
        personal_information: {
          id: user.personal_information ? user.personal_information.id : undefined,
          first_name: user.personal_information ? user.personal_information.first_name : undefined,
          last_name: user.personal_information ? user.personal_information.last_name : undefined,
          email: (user.personal_information ? user.personal_information.email : undefined) || (user.user ? user.user.email : undefined),
          social_id: user.personal_information ? user.personal_information.social_id : undefined,
          gender: user.personal_information ? user.personal_information.gender : undefined,
          phone_number_mobile: user.personal_information ? user.personal_information.phone_number_mobile : undefined,
        },
      };
    } else {
      newUser = {
        id: user.id,
        role: user.role || '',
        students: user.students || '',
        instrument: user.instruemnt || '',
        name: user.name || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        address: user.address || '',
        social_id: user.social_id || '',
        gender: user.gender || '',
        email: user.email || (user.user ? user.user.email : ''),
        phone_number_mobile: user.phone_number_mobile || '',
        phone_number_home: user.phone_number_home || '',
      };
    }
    return newUser;
  }
  return {};
}

export function getUserList(users) {
  const newUsers = [];
  users.forEach((user) => {
    const newUser = {
      registered: user.created_date || null,
      updated: user.modified_date || null,
      type: 'coordinator',
      id: user.id,
      instrument: user.instrument || null,
      students: user.students || null,
      role: user.role || null,
      orchestras: user.orchestras || null,
      orchestra: user.orchestra || null,
      personal_information: {
        first_name: user.personal_information ? user.personal_information.first_name : undefined,
        last_name: user.personal_information ? user.personal_information.last_name : undefined,
        email: (user.personal_information ? user.personal_information.email : undefined) || (user.user ? user.user.email : undefined),
        social_id: user.personal_information ? user.personal_information.social_id : undefined,
        gender: user.personal_information ? user.personal_information.gender : undefined,
        phone_number_mobile: user.personal_information ? user.personal_information.phone_number_mobile : undefined,
      },
    };
    newUsers.push(newUser);
  });

  return newUsers;
}

export function getAdministratorList(users) {
  const newUsers = [];
  users.forEach((user) => {
    const newUser = {
      id: user.id,
      user: {
        username: user.user.username || null,
        email: user.user.email || null,
      },
      personal_information: {
        first_name: user.personal_information ? user.personal_information.first_name : undefined,
        last_name: user.personal_information ? user.personal_information.last_name : undefined,
        email: (user.personal_information ? user.personal_information.email : undefined) || (user.user ? user.user.email : undefined),
        social_id: user.personal_information ? user.personal_information.social_id : undefined,
        gender: user.personal_information ? user.personal_information.gender : undefined,
        phone_number_mobile: user.personal_information ? user.personal_information.phone_number_mobile : undefined,
      },
    };
    newUsers.push(newUser);
  });
  return newUsers;
}

export function getOrchestraList(data) {
  const dataArray = [];
  for (let i = 0; i < data.length; i++) {
    const newOrchestra = {
      image: data[i].photo,
      url: data[i].id,
      name: data[i].name || '',
      status: data[i].is_active || false,
      current_status: data[i].orchestra_status || 'paused',
      registered: data[i].created_date || '',
      updated: data[i].modified_date || '',
      members_count: data[i].orchestra_members_count || 0,
      region: data[i].util ? data[i].util.region : (data[i].area ? data[i].area.province.region : ''),
      province: data[i].util ? data[i].util.province : (data[i].area ? data[i].area.province : ''),
      city: data[i].city ? data[i].city : (data[i].util ? data[i].util.city : null),
      area: data[i].area ? data[i].area : (data[i].util ? data[i].util.area : ''),
      social_networks: data[i].social_networks || '',
      institution: data[i].institution,
      coordinator: data[i].coordinator,
    };
    dataArray.push(newOrchestra);
  }
  return dataArray;
}
export function getArea(data) {
  const newArea = {
    id: data.id,
    code: data.code,
    name: data.name || '',
  };
  return newArea;
}

export function getAreaList(data) {
  const dataArray = [];
  for (let i = 0; i < data.length; i++) {
    const newArea = {
      id: data[i].id,
      code: data[i].code,
      name: data[i].name || '',
    };
    dataArray.push(newArea);
  }
  return dataArray;
}
export function getRegiones(dat) {
  let dataArray = [];

  const data = dat.results;

  /*
  for (let i = 0; i < dat.count; i++) {
    const newRegion = {
      id: data[i].id,
      code: data[i].code,
      name: data[i].name || '',
    };
    dataArray.push(newRegion);
  }
  */
  dataArray = dat.results;
  return dataArray;
}

export function getRegionsList(data) {
  const dataArray = [];

  for (let i = 0; i < data.length; i++) {
    const newRegion = {
      id: data[i].id,
      code: data[i].code,
      name: data[i].name || '',
    };
    dataArray.push(newRegion);
  }
  return dataArray;
}

export function getFunding(funding) {
  const arrayOfArrays = funding.map(o => o.value.split('/'));
  return arrayOfArrays;
}

export function getRegions(regions) {
  const regionsOptions = [
    { value: '', title: 'Selecciona una región' },
    {
      value: regions[0].id, count: regions[0].count, title: 'Región de Arica y Parinacota', coords: '6,36,40,68', shape: 'rect',
    },
    {
      value: regions[1].id, count: regions[1].count, title: 'Región del Tarapacá', coords: '44,30,93,69', shape: 'rect',
    },
    {
      value: regions[2].id, count: regions[2].count, title: 'Región de Antofagasta', coords: '99,6,201,82', shape: 'rect',
    },
    {
      value: regions[3].id, count: regions[3].count, title: 'Región de Atacama', coords: '202,31,284,103', shape: 'rect',
    },
    {
      value: regions[4].id, count: regions[4].count, title: 'Región de Coquimbo', coords: '286,67,354,108', shape: 'rect',
    },
    {
      value: regions[5].id, count: regions[5].count, title: 'Región de Valparaíso', coords: '378,75,356,81,357,103,400,117,394,104,373,89,378,74', shape: 'poly',
    },
    {
      value: regions[6].id, count: regions[6].count, title: 'Región del Libertador Gral. Bernardo O’Higgins', coords: '403,79,420,118', shape: 'rect',
    },
    {
      value: regions[7].id, count: regions[7].count, title: 'Región del Maule', coords: '421,82,451,130', shape: 'rect',
    },
    {
      value: regions[8].id, count: regions[8].count, title: 'Región del Biobío', coords: '453,94,470,155', shape: 'rect',
    },
    {
      value: regions[15].id, count: regions[15].count, title: 'Región del Ñuble', coords: '470,94,501,155', shape: 'rect',
    },
    {
      value: regions[9].id, count: regions[9].count, title: 'Región de la Araucanía', coords: '502,99,531,154', shape: 'rect',
    },
    {
      value: regions[10].id, count: regions[10].count, title: 'Región de los Ríos', coords: '534,109,564,156', shape: 'rect',
    },
    {
      value: regions[11].id, count: regions[11].count, title: 'Región de los Lagos', coords: '567,118,652,176', shape: 'rect',
    },
    {
      value: regions[12].id, count: regions[12].count, title: 'Región de Aisén', coords: '655,117,776,204', shape: 'rect',
    },
    {
      value: regions[13].id, count: regions[13].count, title: 'Región de Magallanes y de la Antártica Chilena', coords: '779,42,1071,203', shape: 'rect',
    },
    {
      value: regions[14].id, count: regions[14].count, title: 'Región Metropolitana de Santiago', coords: '381,73,400,96', shape: 'rect',
    },
  ];
  return regionsOptions;
}

export function getLocations(values, location) {
  const newLocations = [];
  switch (location) {
    case 'regions':
      newLocations.push({ value: '', title: 'Selecciona una región' });
      break;
    case 'provinces':
      newLocations.push({ value: '', title: 'Selecciona una provincia' });
      break;
    case 'area':
      newLocations.push({ value: '', title: 'Selecciona una comuna' });
      break;
  }
  values.forEach((place) => {
    newLocations.push({ value: place.id, title: place.name });
  });

  return newLocations;
}

export function getStats(stats) {
  const newStats = {
    orchestras: { count: stats.orchestras, title: 'Orquestas' },
    administrators: { count: stats.administrators, title: 'Administradores' },
    coordinators: { count: stats.coordinators, title: 'Coordinadores' },
    directors: { count: stats.directors, title: 'Directores' },
    instructors: { count: stats.instructors, title: 'Instructores' },
    cast_members: { count: stats.cast_members, title: 'Elenco' },
  };
  return newStats;
}

export function getExampleOrchestraList() {
  const AllOrchestras = [
    {
      name: 'Orquesta Ejemplo 1',
      url: 2,
      is_active: false,
      modified_date: '2018-10-24T02:00:33.266655-03:00',
      created_date: '2018-10-24T02:00:33.266655-03:00',
      institution: 'Linden Lab Inc',
      coordinator: {
        role: 'Cambiador de páginas',
        personal_information: {
          first_name: 'Carlos',
          last_name: 'Galindo',
          social_id: '15.654.245-9',
          gender: null,
          email: 'carlosgalindo@gmail.com',
          phone_number_mobile: '6 215 65489',
        },
      },
      util: {
        region: { code: '13', id: 13, name: 'Región Metropolitana de Santiago' },
        province: { code: '05', id: 5, name: 'Provincial Provincial' },
        area: { code: '03', id: 8, name: 'Chuchuka' },
        city: 'Fileton',
      },
      social_networks: {
        facebook: 'https://facebook.com/pinedo',
        instagram: 'https://instagram.com/pinedo',
        youtube: 'https://youtube.com/pinedo',
      },
    },
    {
      name: 'Orquesta Ejemplo 2',
      url: 3,
      is_active: true,
      photo: 'http://pinedo.online/foji/html/tmb/orquesta_perfil3.jpg',
      modified_date: '2018-10-24T02:00:33.266655-03:00',
      util: {
        region: { code: '06', id: 6, name: 'Región del Libertador Gral. Bernardo O’Higgins' },
        province: { code: '05', id: 5, name: 'Provincial Provincial' },
        area: { code: '03', id: 8, name: 'Chuchuka' },
        city: 'Fileton',
      },
      social_networks: {
        pinterest: 'https://pinterest.com/pedro',
        vimeo: 'https://vimeo.com/pedro',
      },
    },
    {
      name: 'Orquesta Ejemplo 3',
      url: 4,
      is_active: false,
      photo: 'http://pinedo.online/foji/html/tmb/orquesta_perfil2.jpg',
      modified_date: '2018-10-24T02:00:33.266655-03:00',
      institution: 'Bionico Spa',
      util: {
        region: { code: '01', id: 1, name: 'Región del Tarapacá' },
        province: { code: '05', id: 5, name: 'Provincial Provincial' },
        area: { code: '03', id: 8, name: 'Chuchuka' },
        city: 'Fileton',
      },
      social_networks: {
        vimeo: 'https://vimeo.com/tomasbravo',
        youtube: 'https://youtube.com/tomasbravo',
      },
    },
  ];
  return AllOrchestras;
}

export function getExampleUserList() {
  const Users = [
    {
      type: 'coordinator',
      registered: '2018-10-24T02:00:33.266655-03:00',
      id: 2,
      personal_information: {
        first_name: 'Alonso',
        last_name: 'Galindo',
        social_id: '11.555.999-5',
        email: 'alonsogalindo333@gmail.com',
      },
    },
    {
      type: 'coordinator',
      registered: '2018-10-24T02:00:33.266655-03:00',
      id: 3,
      personal_information: {
        first_name: 'Felipe',
        last_name: 'Garrido',
        social_id: '11.555.999-5',
        email: 'felipe_22_garrido@gmail.com',
      },
    },
    {
      type: 'administrator',
      registered: '2018-10-24T02:00:33.266655-03:00',
      id: 4,
      personal_information: {
        first_name: 'Samuel',
        last_name: 'Jofre',
        social_id: '11.555.999-5',
        email: 'samujofre66@gmail.com',
      },
    },
    {
      type: 'coordinator',
      registered: '2018-10-24T02:00:33.266655-03:00',
      id: 5,
      personal_information: {
        first_name: 'Carlos',
        last_name: 'Cornejo',
        social_id: '11.555.999-5',
        email: 'carloscornejo_dj@gmail.com',
      },
    },
    {
      type: 'administrator',
      registered: '2018-10-24T02:00:33.266655-03:00',
      id: 6,
      personal_information: {
        first_name: 'Juan Pedro',
        last_name: 'Tellez',
        social_id: '11.555.999-5',
        email: 'pedrojuantellez@gmail.com',
      },
    },
    {
      type: 'coordinator',
      registered: '2018-10-24T02:00:33.266655-03:00',
      id: 7,
      personal_information: {
        first_name: 'Pedro Andrés',
        last_name: 'Cáceres',
        social_id: '11.555.999-5',
        email: 'pedroandrescaceres88@gmail.com',
      },
    },
    {
      type: 'coordinator',
      registered: '2018-10-24T02:00:33.266655-03:00',
      id: 8,
      personal_information: {
        first_name: 'Augusto',
        last_name: 'Miller',
        social_id: '11.555.999-5',
        email: 'agutomiller3245@gmail.com',
      },
    },
  ];

  return Users;
}

export function checkEmpty(data) {
  const completedItems = [];
  for (const prop in data) {
    console.log(toString(data[prop].length > 0));

    if (data[prop].length > 0) {
      console.log('pushing prop');
      completedItems.push(prop);
    }
  }
  console.log(completedItems);
}

export default {
  // eslint-disable-next-line max-len
  getCoordinator, getOrchestraList, getRegiones, getAreaList, getArea, getExampleOrchestraList, getUser, getUserList, getRegions, getRegionsList, getLocations, getExampleUserList, getStats, checkEmpty, getEmptyUser, getNewOrchestra,
};
