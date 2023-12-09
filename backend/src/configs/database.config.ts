import {connect, ConnectOptions} from 'mongoose';

export const dbConnect = (): void => {
  connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions).then(
    () => console.log("connect successfully")
  ).catch(
    error => console.log(error)
  );
};
