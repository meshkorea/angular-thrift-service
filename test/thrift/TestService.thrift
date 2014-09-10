struct Info {
  1: required string gender
  2: optional i16 age
  3: optional string college
}

struct Profile {
  1: required string name
  2: optional Info info
}

exception UserException {
  1: required string code
  2: optional string message
}

service TestService {
  Profile createProfile(1: string name, 2: Info info) throws (1: UserException e)
}
