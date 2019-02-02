import linearPartition from 'linear-partition';

export const partitionBlock = (arr) => {
  const numRows = Math.ceil(arr.length / 2.8);
  const weights = arr.map(x => {
    const og = x.images[x.images.length-1];
    return og.width / og.height;
  });

  const partitioned = linearPartition(weights, numRows);

  const rows = [];
  let count = 0;
  partitioned.forEach(row => {
    rows.push([]);
    row.forEach(x => {
      rows[rows.length - 1].push(arr[count]);
      count += 1;
    });
  });

  return rows;
};
