export function cleanOrchestra(orchestra){
  const newOrchestra = {
    photo: orchestra.photo,
    name: orchestra.name,
    orchestra_type: orchestra.orchestra_type,
    orchestra_status: orchestra.orchestra_status,
    is_active: orchestra.is_active,
    social_networks: orchestra.social_networks,
    website: orchestra.website,
    city: orchestra.city,
    area: orchestra.area.id,
    creation_date: orchestra.creation_date,
  }
  //console.log(orchestra.social_networks);
  return newOrchestra;

}

export function cleanMembers(members){

  let newMembers = {};
  const coordinator = {
    role: members.coordinator ? members.coordinator.role : '',
    personal_information: {
      birth_date: members.coordinator ? members.coordinator.birth_date : undefined,
      first_name: members.coordinator ? members.coordinator.first_name : '',
      last_name: members.coordinator ? members.coordinator.last_name : '',
      phone_number_mobile: members.coordinator ? members.coordinator.phone_number_mobile : '',
      social_id: members.coordinator ? members.coordinator.social_id : '',
    }
  }
  
  const director = {
    personal_information: {
      birth_date: members.director ? members.director.birth_date : undefined,
      email: members.director ? members.director.email : '',
      first_name: members.director ? members.director.first_name : '',
      last_name: members.director ? members.director.last_name : '',
      phone_number_mobile: members.director ? members.director.phone_number_mobile : '',
      social_id: members.director ? members.director.social_id : '',
    }  
  }

  let instructors = [];
  members.instructors.map((instructor) => {
    let u = {
      students: Number(instructor.students),
      instrument: instructor.instrument,
      personal_information: {
        birth_date: instructor.birth_date ? instructor.birth_date : undefined,
        email: instructor.email,
        first_name: instructor.first_name,
        last_name: instructor.last_name,
        phone_number_mobile: instructor.phone_number_mobile,
        social_id: instructor.social_id,
      }
    }
    instructors.push(u);
  })

  let cast_members = [];
  members.cast_members.map((cast_member) => {
    let u = {
      instrument: cast_member.instrument,
      personal_information: {
        birth_date: cast_member.birth_date ? cast_member.birth_date : undefined,
        email: cast_member.email,
        first_name: cast_member.first_name,
        last_name: cast_member.last_name,
        phone_number_mobile: cast_member.phone_number_mobile,
        social_id: cast_member.social_id,
        gender: cast_member.gender,
      }
    }
    cast_members.push(u);
  })

  if(members.coordinator){
    newMembers.coordinator = coordinator;
  }
  if(members.director){
    newMembers.director = director;
  }
  if(members.instructors){
    newMembers.instructors = instructors;
  }
  if(members.cast_members){
    newMembers.cast_members = cast_members;
  }

  return newMembers;
}

export function cleanInstitution(institution, legal_rep){
  let newInstitution = {
    institution: {
      address: institution.address,
      name: institution.name,
      email: institution.email,
      phone_number_home: institution.phone_number_home,
      social_id: institution.social_id,
      legal_representation: {
        email: legal_rep.email,
        first_name: legal_rep.first_name,
        last_name: legal_rep.last_name,
        phone_number_mobile: legal_rep.phone_number_mobile,
      }
    }
  }
  return newInstitution;
}

export function cleanFunding(funding){
  const arrayOfObjects = funding.map(a => ({ value: a.join(' / ') }));
  return arrayOfObjects;
}
export default { cleanOrchestra, cleanMembers, cleanInstitution, cleanFunding }