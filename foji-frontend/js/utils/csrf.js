import Cookies from 'js-cookie';


function get_csrf_token() {
  return Cookies.get('csrftoken');
}

export default get_csrf_token;
