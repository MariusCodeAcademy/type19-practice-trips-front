//

export default function UserTrips() {
  // Parsiusti ir atvaizduoti visas prisijungusio userio keliones

  // kreiptis i back
  // GET - /trips/user/1 - 1 yra userId. sis routas is backe parsiuncia userio keliones
  // GET - /trips/user/james@bond.com - james@bond.com yra user email. sis routas is backe parsiuncia userio keliones

  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>UserTrips</h1>
        <p>Welcome to our UserTrips</p>
      </div>
    </div>
  );
}
