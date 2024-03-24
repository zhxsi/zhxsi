<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form inline :model="listQuery">
        <el-form-item>
          <el-date-picker
            size="mini"
            v-model="listQuery.startCreatedTime"
            type="date"
            placeholder="开始创建时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            size="mini"
            v-model="listQuery.endCreatedTime"
            type="date"
            placeholder="结束创建时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            size="mini"
            placeholder="日志ID"
            clearable
            v-model="listQuery.logDataId"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="listQuery.logLevel"
            size="mini"
            placeholder="日志等级"
            clearable
          >
            <el-option
              v-for="item in logLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="listQuery.logGenType"
            size="mini"
            placeholder="日志产生方式"
            clearable
          >
            <el-option
              v-for="item in logGenType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="listQuery.processEndPointMax"
            size="mini"
            placeholder="流程终点"
            clearable
          >
            <el-option
              v-for="item in processEndPointMax"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            size="mini"
            placeholder="扫价配置ID"
            clearable
            v-model="listQuery.processDataHolderSearch.scanDataId"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            size="mini"
            placeholder="采购渠道"
            clearable
            v-model="listQuery.processDataHolderSearch.requestSource"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            size="mini"
            placeholder="出发城市"
            clearable
            v-model="listQuery.processDataHolderSearch.departCity"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            size="mini"
            placeholder="到达城市"
            clearable
            v-model="listQuery.processDataHolderSearch.arriveCity"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            size="mini"
            v-model="listQuery.processDataHolderSearch.startDepartDate"
            type="date"
            placeholder="开始出发时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            size="mini"
            v-model="listQuery.processDataHolderSearch.endDepartDate"
            type="date"
            placeholder="结束出发时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            size="mini"
            placeholder="航班号"
            clearable
            v-model="listQuery.processDataHolderSearch.flightNoReg"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            size="mini"
            placeholder="产品类型"
            clearable
            v-model="
              listQuery.processDataHolderSearch.productTypeNameReg
            "
          >
          </el-input>
        </el-form-item> -->
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            size="mini"
            placeholder="备注"
            clearable
            v-model="listQuery.remark"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            size="mini"
            placeholder="失败信息"
            clearable
            v-model="listQuery.failMsg"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="mini"
            class="btntheme"
            icon="el-icon-search"
            @click="handleFilter"
            >搜索</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            size="mini"
            class="btntheme"
            icon="el-icon-back"
            @click="resetQuery"
            >清空</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <tableList
      :listQuery="listQuery"
      :limit="limit"
      :page="page"
      :processEndPointMax="processEndPointMax"
      ref="tableList"
      @changeLimit="(val) => (limit = val)"
      @changPage="(val) => (page = val)"
    />
  </div>
</template>
<script>
import tableList from "./components/tableList";
export default {
  components: { tableList },
  data() {
    return {
      logGenType: [
        { value: 1, label: "系统自动触发生成" },
        { value: 2, label: "用户手动操作" },
      ],
      logLevel: [
        { value: "INFO", label: "INFO" },
        { value: "WARN", label: "WARN" },
        { value: "ERROR", label: "ERROR" },
      ],
      processEndPointMax: [
        { value: 10, label: "扫价配置" },
        { value: 20, label: "低价数据" },
        { value: 30, label: "本地政策数据" },
        { value: 40, label: "匹配政策数据" },
        { value: 50, label: "调价更新数据" },
        { value: 60, label: "同步携程数据" },
      ],
      limit: 10,
      page: 1,
      dialogShow: false,
      listQuery: {
        pageSize: 10,
        pageNum: 1,
        logDataId: null,
        logGenType: null,
        logLevel: null,
        scanDataId: null,
        startCreatedTime: null,
        endCreatedTime: null,
        processEndPointMax: null,
        processDataHolderSearch: {
          scanDataId: null,
          requestSource: null,
          departCity: null,
          arriveCity: null,
          startDepartDate: null,
          endDepartDate: null,
          flightNoReg: null,
          // productTypeNameReg: null
        },
        remark: null,
        failMsg: null,
      },
    };
  },
  created() {
    this.listQuery.pageSize = this.limit;
  },
  methods: {
    getList() {
      this.$refs.tableList.getList();
    },
    // 搜索
    handleFilter() {
      this.page = 1;
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = this.limit;
      this.getList();
    },
    // 清空
    resetQuery() {
      this.page = 1;
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = this.limit;
      this.listQuery.logDataId = null;
      this.listQuery.logGenType = null;
      this.listQuery.logLevel = null;
      this.listQuery.scanDataId = null;
      this.listQuery.startCreatedTime = null;
      this.listQuery.endCreatedTime = null;
      this.listQuery.processEndPointMax = null;
      this.listQuery.processDataHolderSearch.scanDataId = null;
      this.listQuery.processDataHolderSearch.requestSource = null;
      this.listQuery.processDataHolderSearch.departCity = null;
      this.listQuery.processDataHolderSearch.arriveCity = null;
      this.listQuery.processDataHolderSearch.startDepartDate = null;
      this.listQuery.processDataHolderSearch.endDepartDate = null;
      this.listQuery.processDataHolderSearch.flightNoReg = null;
      // this.listQuery.processDataHolderSearch.productTypeNameReg = null
      this.listQuery.remark = null;
      this.listQuery.failMsg = null;

      this.getList();
    },
  },
};
</script>
