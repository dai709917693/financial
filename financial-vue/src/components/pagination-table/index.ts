import { ref } from 'vue';

export function paginationTableData<T = any>(api: Function) {
  const total = ref(0);
  const tableData = ref<T[]>([]);

  const pageSize = ref(10);
  const currentPage = ref(1);

  async function getList() {
    const res = await api({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
    });
    tableData.value = res.data.list;
    total.value = res.data.total;
  }
  getList();

  return {
    tableData,
    pageSize,
    currentPage,
    total,
    getList,
  };
}
