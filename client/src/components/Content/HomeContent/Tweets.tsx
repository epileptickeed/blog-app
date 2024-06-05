import useGetProfile from '../../../../hooks/useGetProfile';

const Tweets = () => {
  const { data, isLoading, isError } = useGetProfile();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Ooops something went wrong</div>;

  return (
    <div>
      {data.error ? (
        <div>You need to login first, to see your tweets</div>
      ) : (
        data?.posts?.map((item: any, index: any) => {
          return (
            <div key={index}>
              {item.text}
              {item.date}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Tweets;
