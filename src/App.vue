<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios'

// primevue plugins
import { useToast } from "primevue/usetoast";
const toast = useToast();

const data = ref(null);
const itemCheck = ref(false);
const searchCheck = ref(false);
const products = ref();
const files = ref([]);
const items = ref([]);


    
const searchEnter = async () => {

  searchCheck.value = true
  let params = {
    script_to_execute: 'search',
    keyword: data.value,
  };
  try {
    const response = await axios.post('http://localhost:5000/trigger-python', params);
    const jsonString = response.data.stdout.replace(/'/g, '"').replace(/None/g, 'null');
    
    const item = JSON.parse(jsonString)

    console.log(item)
    if(item.length > 0) {
      itemCheck.value = true;
      searchCheck.value = true;

    
      // item.forEach(obj => {
      //   const fileItem = ref()
      //   // 받아온 arr[obj 10] 거에서 obj 특정값만 뽑아서 새로운 obj 넣고 -> arr에 넣을때 -> obj는 반복문 끝날때마다 초기화가 되어야지 새로운게 들어가서 끝날떄마다 arr에 잘 들어간다( 초기화 없으면 마지막꺼가 반복되 들어간다 이래서 특정값 obj 새롭게 뽑아서 넣을땐 반복문 밖에 초기화로 선언해야 초기화되면서 새로운 값이 추가될 수 있다 -> arr는 밖이지만 obj는 반복문시작될때 초기화로 선언해서 넣자(밖에다 넣으면 반복문때마다 초기화하는거니 그냥 반복문때마다 선언으로 초기화가 더 낫다 보통 이렇게 쓴다))
      //   for (let i = 0; i <= 4; i++) {
      //     if (obj[`file_name_${i}`] !== null) {
      //       fileItem.value = obj[`file_name_${i}`];
      //     }
      //   }
      //   files.value.push(fileItem.value)
      // });


    products.value = JSON.parse(jsonString)
    items.value = JSON.parse(jsonString).map((item) => item.kms_sj);

    toast.add({ severity: 'success', summary: '알림', detail: `총 ${item.length}개 검색되었습니다 `, life: 3000 });

    } else {
      itemCheck.value = false
      searchCheck.value = false;
      toast.add({ severity: 'warn', summary: '알림', detail: '데이터가 없습니다', life: 3000 });

    }
  } catch (error) {
    console.error('Error sending refresh request:', error);

  }
}


</script>

<template>
  <div class="search-group">
    <Toast />
    <div class="card p-fluid">
      <AutoComplete v-model="data" :suggestions="items" @complete="searchEnter" />
    </div>

    <div class="card" v-if="searchCheck">
      <template v-if="itemCheck">
        <DataView :value="products" paginator :rows="5">
          <!-- template로 따로 설정할때 #list값 필요 -> list value값은 검색 (아무값이나 주기만해도 나오고 안 주면 안나옴 기본 dataview쓸거 아니고 template로 따로 그 안 디테일 설정할때 사용) -->
          <!-- pagination -> 컴포넌트가 아닌 옵션으로 할때 등등 template쪽에 값을 넣으면 해당 값은 item이 붙으면서 v-for로 들어가는 규칙 -> 검색 -->
          <template #list="products">
            <div class="flex flex-col">
              <div v-for="(item, index) in products.items" :key="index">
                <Fieldset class="datav-view"  selectionMode='single' :legend="item.kms_sj">
                  <p class="m-0">{{ item.kms_cn }}</p>
                  <!-- 반복할 요소 상위에다하면 해당 자식도 반복되는지 -> 반복안되면 상위 반복데이터 자식에 넣으면 되는지 -> 아니면 자식에다가 넣어야 반복만큼되는지(이건됨) -> 상위에서 해도 내려받아지면서 같이 반복되는지 확인, 중복 for문 자기꺼만 추출해서 넣는방법 검색 -->
                  <template v-for="(i, e) in 5" :key="e">
                    <Chip v-if="item['file_name_' + e]" :label="item['file_name_' + e]" v-tooltip="item['file_content_' + e]" />
                  </template>
                </Fieldset>
              </div>
            </div>
          </template>
        </DataView>
      </template>
      <template v-else>
        <Skeleton v-for="a in 5" :key="a" class="skeleton"></Skeleton>
      </template>
    </div>
  </div>
</template>


<style lang="scss" scoped>


.card {
  margin-top: 30px;
}
.search-group {
  width: 800px;
  margin: auto;
}


.skeleton {
  width: 50rem;
  height: 7rem !important;
  margin-top: 1rem;
  &:first-child {
    margin-top: 0;
  }
}

.datav-view {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.datav-view:hover {
  cursor: pointer;
  background-color: #f5f5f5;
  transform: translateY(-5px);
}
</style>