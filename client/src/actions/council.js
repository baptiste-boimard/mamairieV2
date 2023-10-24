/** Action for Council component */

/** GET from API council members to council page */
export const GET_COUNCIL_MEMBERS = 'GET_COUNCIL_MEMBERS';
export const getCouncilMembers = () => ({
  type: GET_COUNCIL_MEMBERS,
});

/** Attribute council members value to state */
export const SET_COUNCIL_MEMBERS = 'SET_COUNCIL_MEMBERS';
export const setCouncilMembers = (councilMembers) => ({
  type: SET_COUNCIL_MEMBERS,
  councilMembers,
});

/** POST council members to council page */
export const POST_COUNCIL_MEMBERS = 'POST_COUNCIL_MEMBERS';
export const postCouncilMembers = () => ({
  type: POST_COUNCIL_MEMBERS,
});

// PATCH council members to council page
export const PATCH_COUNCIL_MEMBERS = 'PATCH_COUNCIL_MEMBERS';
export const patchCouncilMembers = (photo, firstName, lastName, role, id) => ({
  type: PATCH_COUNCIL_MEMBERS,
  photo,
  firstName,
  lastName,
  role,
  id,
});

// DELETE council members to council page
export const DELETE_COUNCIL_MEMBERS = 'DELETE_COUNCIL_MEMBERS';
export const deleteCouncilMembers = (id) => ({
  type: DELETE_COUNCIL_MEMBERS,
  id,
});

// Add a new council member to council page
export const ADD_COUNCIL_MEMBERS = 'ADD_COUNCIL_MEMBERS';
export const addCouncilMembers = () => ({
  type: ADD_COUNCIL_MEMBERS,
});

// Open council member editing menu
export const TOGGLE_EDITING_MEMBER = 'TOGGLE_EDITING_MEMBER';
export const toggleEditingMember = (name) => ({
  type: TOGGLE_EDITING_MEMBER,
  name,
});

/** Create a specific pair key/value to council reducer to open specically one member to edit */
export const CREATE_EDITING_MEMBER = 'CREATE_EDITING_MEMBER';
export const createEditingMember = (name) => ({
  type: CREATE_EDITING_MEMBER,
  name,
});

/** Create a specific pair key/value to council reducer to change specically one member lastname */
export const CREATE_EDITING_MEMBER_LASTNAME = 'CREATE_EDITING_MEMBER_LASTNAME';
export const createEditingMemberLastName = (value, key) => ({
  type: CREATE_EDITING_MEMBER_LASTNAME,
  value,
  key,
});

/** Create a specific pair key/value to council reducer to change specically one member firstname */
export const CREATE_EDITING_MEMBER_FIRSTNAME = 'CREATE_EDITING_MEMBER_FIRSTNAME';
export const createEditingMemberFirstName = (value, key) => ({
  type: CREATE_EDITING_MEMBER_FIRSTNAME,
  value,
  key,
});

/** Create a specific pair key/value to council reducer to change specically one member role */
export const CREATE_EDITING_MEMBER_ROLE = 'CREATE_EDITING_MEMBER_ROLE';
export const createEditingMemberRole = (value, key) => ({
  type: CREATE_EDITING_MEMBER_ROLE,
  value,
  key,
});

/** Create a specific pair key/value to council reducer to change specically one member photo */
export const CREATE_EDITING_MEMBER_PHOTO = 'CREATE_EDITING_MEMBER_PHOTO';
export const createEditingMemberPhoto = (value, key) => ({
  type: CREATE_EDITING_MEMBER_PHOTO,
  value,
  key,
});
