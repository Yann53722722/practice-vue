<template>
  <div class="person-center">
    <div class="header">
      <stu-nav-bar></stu-nav-bar>
    </div>
    <div class="main">
      <div class="person-info">
        <el-card style="height: 350px">
          <div slot="header">
            <span style="font-size: 30px">个人信息</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="personInfoEdit = true">编辑</el-button>
          </div>
          <div style="text-align: left;margin-left: 30px" v-if="personInfoEdit === false">
            <div style="font-size: 50px">
              {{ personInfo.name }}
            </div>
            <div style="margin-top: 20px">
              <span v-if="personInfo.gender === 'MALE'">男</span>
              <span v-else-if="personInfo.gender === 'FEMALE'">女</span>
              <span v-else></span>
              <span style="margin: 0 20px;color: #B3C0D1">|</span>
              {{ personInfo.age }}
              <span style="margin: 0 20px;color: #B3C0D1">|</span>
              {{ personInfo.city }}
            </div>
            <div style="margin-top: 20px">
              {{ personInfo.mobile }}
              <span style="margin: 0 20px;color: #B3C0D1">|</span>
              {{ personInfo.email }}
            </div>
          </div>
          <div v-else>
            <el-form :model="personInfo" :label-position="position">
              <el-col :span="12">
                <el-form-item label="姓名">
                  <el-input v-model="personInfo.name"/>
                </el-form-item>
                <el-form-item label="出生年月">
                  <el-date-picker v-model="personInfo.birthday" type="date" placeholder="选择日期"/>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio v-model="personInfo.gender" label="MALE">男</el-radio>
                  <el-radio v-model="personInfo.gender" label="FEMALE">女</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所在城市">
                  <el-select style="width: 100px" v-model="province" @change="citySelect" placeholder="请选择">
                    <el-option
                      v-for="item in provinceOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select style="width: 100px" v-model="personInfo.city" placeholder="请选择">
                    <el-option
                      v-for="item in cityOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="personInfo.email" type="email"/>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="personInfo.mobile"/>
                </el-form-item>
                <el-form-item style="text-align: right">
                  <el-button type="primary" @click="editPersonInfo">确定</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </div>
        </el-card>
      </div>
      <div class="resume">
        <el-card>
          <div slot="header">
            <span style="font-size: 30px">简历中心</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleResumeTypeDialogOpen">新增</el-button>
          </div>
          <div class="resume-list">
            <el-table :data="resumes">
              <el-table-column prop="resumeName" label="简历名称" align="center"></el-table-column>
              <el-table-column label="简历类型" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.resumeType === 'TEMPLATE'">模板简历</span>
                  <span v-else>附件简历</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleEditDialogOpen(scope.row.id, scope.$index, scope.row.resumeType)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDeleteResume(scope.row.id, scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>
    <div class="dialog">
      <el-dialog
        title="简历编辑"
        :visible="editDialogVisible"
        width="60%"
        :before-close="handleEditDialogClose"
      >
        <div>
          <div style="text-align: left">
            <h1>基本信息</h1>
          </div>
          <el-card shadow="hover">
            <div slot="header" style="text-align: left">
              <span>{{ resumeVO.resume.resumeName }}</span>
              <div style="float: right">
                <el-button type="text" @click="editResumeDialogOpen">编辑</el-button>
              </div>
            </div>
            <div>
              <div class="card-content">
                期望职位：<span class="content-font">{{ resumeVO.resume.expectJob }}</span>
              </div>
              <div class="card-content">
                期望城市：<span class="content-font">{{ resumeVO.resume.workingCity }}</span>
              </div>
              <div class="card-content">
                自我评价：<span class="content-font">{{ resumeVO.resume.selfEvaluation}}</span>
              </div>
              <div class="card-content">
                作品链接：<span class="content-font">{{ resumeVO.resume.worksLink }}</span>
              </div>
            </div>
          </el-card>
          <el-dialog
            title="基本信息"
            :visible="resumeEditDialogVisible"
            append-to-body
            width="60%"
            :before-close="handleResumeDialogClose"
          >
            <el-form :model="resume">
              <el-form-item label="简历名称">
                <el-input v-model="resume.resumeName"/>
              </el-form-item>
              <el-form-item label="期望职位">
                <el-input v-model="resume.expectJob"/>
              </el-form-item>
              <el-form-item label="期望城市">
                <el-select style="width: 337px" v-model="resume.workingCity">
                  <el-option label="成都" value="成都"></el-option>
                  <el-option label="北京" value="北京"></el-option>
                  <el-option label="上海" value="上海"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="自我评价">
                <el-input
                  style="width: 80%"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="resume.selfEvaluation">
                </el-input>
              </el-form-item>
              <el-form-item label="作品链接">
                <el-input v-model="resume.worksLink"/>
              </el-form-item>
              <el-form-item style="text-align: right">
                <el-button type="primary" @click="editResume">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <div>
          <div style="text-align: left"><h1>教育背景</h1></div>
          <el-card style="margin-bottom: 10px" v-for="(item, index) in resumeVO.educations" :key="item.id">
            <div slot="header" style="text-align: left">
              {{ item.start }}~{{ item.end }}
              <span class="line">|</span>
              {{ item.school }}
              <span class="line">|</span>
              {{ item.profession }}
              <span class="line">|</span>
              <span v-if="item.educationRank === 'UNDERGRADUATE'">本科</span>
              <span v-else-if="item.educationRank === 'HIGH_SCHOOL'">高中</span>
              <span v-else-if="item.educationRank === 'TECHNICAL_SECONDARY_SCHOOL'">中专</span>
              <span v-else-if="item.educationRank === 'JUNIOR_COLLEGE'">大专</span>
              <span v-else-if="item.educationRank === 'MASTER'">硕士</span>
              <span v-else-if="item.educationRank === 'DOCTOR'">博士</span>
              <div style="float: right" >
                <el-button type="text" @click="editEducationDialogOpen(item, index)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteEducation(item.id, index)">删除</el-button>
              </div>
            </div>
            <div class="card-content">
              成绩排名：<span class="content-font">{{ item.gradeRank }}</span>
            </div>
            <div class="card-content">
              主修课程：<span class="content-font">{{ item.courses }}</span>
            </div>
            <div class="card-content">
              荣誉奖励：<span class="content-font">{{ item.awards }}</span>
            </div>
          </el-card>
          <div>
            <el-button style="width: 100%;margin-top: 20px" type="primary" icon="el-icon-plus" @click="addEducationDialogOpen">新增教育背景</el-button>
          </div>
          <el-dialog
            title="教育背景"
            :visible="educationEditDialogVisible"
            append-to-body
            width="60%"
            :before-close="handleEducationDialogClose"
          >
            <el-form :model="education">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="学校">
                    <el-input v-model="education.school"/>
                  </el-form-item>
                  <el-form-item label="专业">
                    <el-input v-model="education.profession"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学历">
                    <el-select v-model="education.educationRank">
                      <el-option
                        v-for="item in educationRankOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="排名">
                    <el-select v-model="education.gradeRank">
                      <el-option
                        v-for="item in gradeRankOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="在校时间">
                  <el-date-picker
                    style="width: 30%"
                    v-model="education.start"
                    value-format="yyyy"
                    type="year"
                    placeholder="选择年"/>
                  <span>-</span>
                  <el-date-picker
                    style="width: 30%"
                    value-format="yyyy"
                    v-model="education.end"
                    type="year"
                    placeholder="选择年"/>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="主修课程">
                  <el-input
                    style="width: 80%"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="education.courses">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="荣誉奖励">
                  <el-input
                    style="width: 80%"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="education.awards">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-form-item style="text-align: right">
                <el-button type="primary" @click="editOrAdd==='edit'?editEducation():addEducation()">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <div>
          <div style="text-align: left"><h1>实习经历</h1></div>
          <el-card
            style="margin-bottom: 10px"
            v-for="(item, index) in resumeVO.practiceExperiences"
            :key="item.id"
          >
            <div slot="header" style="text-align: left">
              {{ item.title }}
              <div style="float: right">
                <el-button type="text" @click="editPracticeExperienceDialogOpen(item, index)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deletePracticeExperience(item.id, index)">删除</el-button>
              </div>
            </div>
            <div style="text-align: left">
              <span>{{ item.position }}</span>
              <span class="content-font" style="float: right">{{ item.start }}~{{ item.end }}</span>
            </div>
            <div style="text-align: left;margin-top: 10px" class="content-font">
              {{ item.description }}
            </div>
          </el-card>
          <div>
            <el-button style="width: 100%;margin-top: 20px" type="primary" icon="el-icon-plus" @click="addPracticeExperienceDialogOpen">新增实习经历</el-button>
          </div>
          <el-dialog
            title="实习经历"
            :visible="practiceExperienceEditDialogVisible"
            append-to-body
            width="60%"
            :before-close="handlePracticeExperienceDialogClose"
          >
            <el-form :model="experience">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="公司">
                    <el-input v-model="experience.title"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="担任职务">
                    <el-input v-model="experience.position"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="时间">
                  <el-date-picker
                    style="width: 30%"
                    v-model="experience.start"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="开始时间"/>
                  <span>-</span>
                  <el-date-picker
                    style="width: 30%"
                    value-format="yyyy-MM-dd"
                    v-model="experience.end"
                    type="date"
                    placeholder="结束时间"/>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="经历描述">
                  <el-input
                    style="width: 80%"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="experience.description">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-form-item style="text-align: right">
                <el-button type="primary" @click="editOrAdd==='edit'?editPracticeExperience():addPracticeExperience()">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <div>
          <div style="text-align: left"><h1>学术经历</h1></div>
          <el-card
            style="margin-bottom: 10px"
            v-for="(item, index) in resumeVO.researchExperiences"
            :key="item.id"
          >
            <div slot="header" style="text-align: left">
              {{ item.title }}
              <div style="float: right">
                <el-button type="text" @click="editResearchExperienceDialogOpen(item, index)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteResearchExperience(item.id, index)">删除</el-button>
              </div>
            </div>
            <div style="text-align: left">
              <span>{{ item.position }}</span>
              <span class="content-font" style="float: right">{{ item.start }}~{{ item.end }}</span>
            </div>
            <div style="text-align: left;margin-top: 10px" class="content-font">
              {{ item.description }}
            </div>
          </el-card>
          <div>
            <el-button style="width: 100%;margin-top: 20px" type="primary" icon="el-icon-plus" @click="addResearchExperienceDialogOpen">新增学术经历</el-button>
          </div>
          <el-dialog
            title="学术经历"
            :visible="researchExperienceEditDialogVisible"
            append-to-body
            width="60%"
            :before-close="handleResearchExperienceDialogClose"
          >
            <el-form :model="experience">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="项目名称">
                    <el-input v-model="experience.title"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="担任职务">
                    <el-input v-model="experience.position"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="时间">
                  <el-date-picker
                    style="width: 30%"
                    v-model="experience.start"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="开始时间"/>
                  <span>-</span>
                  <el-date-picker
                    style="width: 30%"
                    value-format="yyyy-MM-dd"
                    v-model="experience.end"
                    type="date"
                    placeholder="结束时间"/>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="经历描述">
                  <el-input
                    style="width: 80%"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="experience.description">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-form-item style="text-align: right">
                <el-button type="primary" @click="editOrAdd==='edit'?editResearchExperience():addResearchExperience()">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <div>
          <div style="text-align: left"><h1>校园经历</h1></div>
          <el-card
            style="margin-bottom: 10px"
            v-for="(item, index) in resumeVO.schoolExperiences"
            :key="item.id"
          >
            <div slot="header" style="text-align: left">
              {{ item.title }}
              <div style="float: right">
                <el-button type="text" @click="editSchoolExperienceDialogOpen(item, index)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteSchoolExperience(item.id, index)">删除</el-button>
              </div>
            </div>
            <div style="text-align: left">
              <span>{{ item.position }}</span>
              <span class="content-font" style="float: right">{{ item.start }}~{{ item.end }}</span>
            </div>
            <div style="text-align: left;margin-top: 10px" class="content-font">
              {{ item.description }}
            </div>
          </el-card>
          <div>
            <el-button style="width: 100%;margin-top: 20px" type="primary" icon="el-icon-plus" @click="addSchoolExperienceDialogOpen">新增校园经历</el-button>
          </div>
          <el-dialog
            title="学术经历"
            :visible="schoolExperienceEditDialogVisible"
            append-to-body
            width="60%"
            :before-close="handleSchoolExperienceDialogClose"
          >
            <el-form :model="experience">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="项目名称">
                    <el-input v-model="experience.title"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="担任职务">
                    <el-input v-model="experience.position"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label="时间">
                  <el-date-picker
                    style="width: 30%"
                    v-model="experience.start"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="开始时间"/>
                  <span>-</span>
                  <el-date-picker
                    style="width: 30%"
                    value-format="yyyy-MM-dd"
                    v-model="experience.end"
                    type="date"
                    placeholder="结束时间"/>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="经历描述">
                  <el-input
                    style="width: 80%"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="experience.description">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-form-item style="text-align: right">
                <el-button type="primary" @click="editOrAdd==='edit'?editSchoolExperience():addSchoolExperience()">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
        <div>
          <div style="text-align: left"><h1>技能爱好</h1></div>
          <el-card
            style="margin-bottom: 10px"
            v-for="(item, index) in resumeVO.skills"
            :key="item.id"
          >
            <div slot="header" style="text-align: left">
              <span v-if="item.skillType === 'PROFESSIONAL'">专业技能</span>
              <span v-if="item.skillType === 'LANGUAGE'">语言能力</span>
              <span v-if="item.skillType === 'HOBBY'">兴趣爱好</span>
              <span v-if="item.skillType === 'OTHER'">其他类型</span>
              <div style="float: right">
                <el-button type="text" @click="editSkillDialogOpen(item, index)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteSkill(item.id, index)">删除</el-button>
              </div>
            </div>
            <div style="text-align: left;margin-top: 10px" class="content-font">
              {{ item.description }}
            </div>
          </el-card>
          <div>
            <el-button style="width: 100%;margin-top: 20px" type="primary" icon="el-icon-plus" @click="addSkillDialogOpen">新增技能爱好</el-button>
          </div>
          <el-dialog
            title="技能爱好"
            :visible="skillEditDialogVisible"
            append-to-body
            width="60%"
            :before-close="handleSkillDialogClose"
          >
            <el-form :model="skill">
              <el-form-item label="类型">
                <el-select v-model="skill.skillType">
                  <el-option value="PROFESSIONAL" label="专业技能"/>
                  <el-option value="LANGUAGE" label="语言能力"/>
                  <el-option value="HOBBY" label="兴趣爱好"/>
                  <el-option value="OTHER" label="其他类型"/>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input
                  style="width: 80%"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="skill.description">
                </el-input>
              </el-form-item>
              <el-form-item style="text-align: right">
                <el-button type="primary" @click="editOrAdd==='edit'?editSkill():addSkill()">保存</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </el-dialog>
    </div>
    <div class="choose-resume-type">
      <el-dialog
        :visible="chooseVisible"
        width="20%"
        :before-close="handleResumeTypeDialogClose"
      >
        <div><el-button type="primary" style="margin-bottom: 20px" @click="handleResumeAdd">模板简历</el-button></div>
        <div><el-button type="primary">附件简历</el-button></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import StuNavBar from '../home/components/StuNavBar'
import {getUserInfoById} from '../../api/user'
import {
  addEducation,
  addExperience, addResume,
  addSkill,
  deleteEducation,
  deleteExperience, deleteResume,
  deleteSkill,
  editEducation,
  editExperience, editResume,
  editSkill,
  getPersonInfo,
  getResumeListByPersonInfoId,
  getResumeVOByResumeId,
  updatePersonInfo
} from '../../api/resume'
import {jsGetAge} from '../../utils/age'
import cities from '../../utils/cities'
export default {
  name: 'Index',
  components: {StuNavBar},
  data () {
    return {
      province: null,
      provinceOptions: null,
      cityOptions: null,
      index: 0,
      editOrAdd: 'edit', // true表示处于编辑状态，false表示处于添加状态
      educationEditDialogVisible: false, // 教育背景编辑对话框状态
      practiceExperienceEditDialogVisible: false,
      researchExperienceEditDialogVisible: false,
      schoolExperienceEditDialogVisible: false,
      skillEditDialogVisible: false,
      editDialogVisible: false,
      resumeEditDialogVisible: false,
      position: 'left',
      personInfoEdit: false,
      user: {
        username: null,
        status: null,
        id: this.$store.getters.userId
      },
      personInfo: {
        id: null,
        mobile: null,
        email: null,
        name: null,
        gender: null,
        birthday: null,
        city: null,
        age: null
      },
      resumes: [],
      resumeVO: {
        resume: {
          id: null,
          personInfoId: null,
          expectJob: null,
          workingCity: null,
          selfEvaluation: null,
          worksLink: null,
          resumeType: null,
          resumeName: null
        },
        skills: [],
        educations: [],
        practiceExperiences: [],
        researchExperiences: [],
        schoolExperiences: []
      },
      education: {
        id: null,
        resumeId: null,
        awards: null,
        educationRank: null,
        start: null,
        end: null,
        school: null,
        courses: null,
        gradeRank: null,
        profession: null
      },
      experience: {
        id: null,
        experienceType: null,
        title: null,
        position: null,
        start: null,
        end: null,
        description: null,
        resumeId: null
      },
      skill: {
        id: null,
        skillType: null,
        description: null,
        resumeId: null
      },
      resume: {
        id: null,
        expectJob: null,
        workingCity: null,
        selfEvaluation: null,
        personInfoId: null,
        worksLink: null,
        resumeType: null,
        resumeName: null
      },
      educationRankOptions: [
        {
          value: 'HIGH_SCHOOL',
          label: '高中'
        },
        {
          value: 'TECHNICAL_SECONDARY_SCHOOL',
          label: '中专'
        },
        {
          value: 'JUNIOR_COLLEGE',
          label: '大专'
        },
        {
          value: 'UNDERGRADUATE',
          label: '本科'
        },
        {
          value: 'MASTER',
          label: '硕士'
        },
        {
          value: 'DOCTOR',
          label: '博士'
        }
      ],
      gradeRankOptions: ['前10%', '前30%', '中等', '中下'],
      chooseVisible: false,
      resumeIndex: null
    }
  },
  created () {
    this.provinceOptions = cities
    this.getUser()
  },
  methods: {
    getUser () {
      getUserInfoById(this.$store.getters.userId).then(res => {
        this.user = res.data
      })
      getPersonInfo(this.$store.getters.userId).then(res => {
        this.personInfo = res.data
        this.personInfo.age = jsGetAge(this.personInfo.birthday)
        getResumeListByPersonInfoId(this.personInfo.id).then(res => {
          this.resumes = res.data
        })
      })
    },
    editPersonInfo () {
      updatePersonInfo(this.personInfo).then(res => {
        this.personInfo = res.data
        this.personInfoEdit = false
        this.personInfo.age = jsGetAge(this.personInfo.birthday)
      })
    },
    resetResumeVO () {
      this.resumeVO = {
        resume: {
          id: null,
          personInfoId: null,
          expectJob: null,
          workingCity: null,
          selfEvaluation: null,
          worksLink: null,
          resumeType: null,
          resumeName: null
        },
        skills: [],
        educations: [],
        practiceExperiences: [],
        researchExperiences: [],
        schoolExperiences: []
      }
    },
    handleEditDialogClose () {
      this.editDialogVisible = false
      this.resetResumeVO()
    },
    handleEducationDialogClose () {
      this.educationEditDialogVisible = false
      this.resetEducation()
    },
    handlePracticeExperienceDialogClose () {
      this.practiceExperienceEditDialogVisible = false
      this.resetExperience()
    },
    handleResearchExperienceDialogClose () {
      this.researchExperienceEditDialogVisible = false
      this.resetExperience()
    },
    handleSchoolExperienceDialogClose () {
      this.schoolExperienceEditDialogVisible = false
      this.resetExperience()
    },
    handleSkillDialogClose () {
      this.skillEditDialogVisible = false
      this.resetSkill()
    },
    handleResumeDialogClose () {
      this.resumeEditDialogVisible = false
      this.resetResume()
    },
    resetExperience () {
      this.experience = {
        id: null,
        experienceType: null,
        title: null,
        position: null,
        start: null,
        end: null,
        description: null,
        resumeId: null
      }
    },
    resetSkill () {
      this.skill = {
        id: null,
        skillType: null,
        description: null,
        resumeId: null
      }
    },
    resetResume () {
      this.resume = {
        id: null,
        expectJob: null,
        workingCity: null,
        selfEvaluation: null,
        personInfoId: null,
        worksLink: null,
        resumeType: null,
        resumeName: null
      }
    },
    citySelect (value) {
      for (let i = 0; i < this.provinceOptions.length; i++) {
        if (this.provinceOptions[i].value === value) {
          this.cityOptions = this.provinceOptions[i].children
        }
      }
    },
    handleEditDialogOpen (resumeId, index, resumeType) {
      this.resumeIndex = index
      if (resumeType === 'FILE') {
      } else {
        this.editDialogVisible = true
        getResumeVOByResumeId(resumeId).then(res => {
          this.resumeVO.resume = res.data.resume
          this.resumeVO.educations = res.data.educations
          this.resumeVO.skills = res.data.skills
          let experiences = res.data.experiences
          for (let i = 0; i < experiences.length; i++) {
            if (experiences[i].experienceType === 'PRACTICEEXPERIENCE') {
              this.resumeVO.practiceExperiences.push(experiences[i])
            } else if (experiences[i].experienceType === 'RESEARCHEXPERIENCE') {
              this.resumeVO.researchExperiences.push(experiences[i])
            } else if (experiences[i].experienceType === 'SCHOOLEXPERIENCE') {
              this.resumeVO.schoolExperiences.push(experiences[i])
            }
          }
        })
      }
    },
    addEducationDialogOpen () {
      this.editOrAdd = 'add'
      this.educationEditDialogVisible = true
      this.resetEducation()
      this.education.resumeId = this.resumeVO.resume.id
    },
    addPracticeExperienceDialogOpen () {
      this.practiceExperienceEditDialogVisible = true
      this.editOrAdd = 'add'
      this.experience.experienceType = 'PRACTICEEXPERIENCE'
      this.experience.resumeId = this.resumeVO.resume.id
    },
    addResearchExperienceDialogOpen () {
      this.researchExperienceEditDialogVisible = true
      this.editOrAdd = 'add'
      this.experience.experienceType = 'RESEARCHEXPERIENCE'
      this.experience.resumeId = this.resumeVO.resume.id
    },
    addSchoolExperienceDialogOpen () {
      this.schoolExperienceEditDialogVisible = true
      this.editOrAdd = 'add'
      this.experience.experienceType = 'SCHOOLEXPERIENCE'
      this.experience.resumeId = this.resumeVO.resume.id
    },
    addSkillDialogOpen () {
      this.skillEditDialogVisible = true
      this.editOrAdd = 'add'
      this.skill.resumeId = this.resumeVO.resume.id
    },
    resetEducation () {
      this.education = {
        id: null,
        resumeId: null,
        awards: null,
        educationRank: null,
        start: null,
        end: null,
        school: null,
        courses: null,
        gradeRank: null,
        profession: null
      }
    },
    addEducation () {
      addEducation(this.education).then(res => {
        this.resumeVO.educations.push(res.data)
        this.educationEditDialogVisible = false
        this.resetEducation()
      })
    },
    addPracticeExperience () {
      addExperience(this.experience).then(res => {
        this.resumeVO.practiceExperiences.push(res.data)
        this.practiceExperienceEditDialogVisible = false
        this.resetExperience()
      })
    },
    addResearchExperience () {
      addExperience(this.experience).then(res => {
        this.resumeVO.researchExperiences.push(res.data)
        this.researchExperienceEditDialogVisible = false
        this.resetExperience()
      })
    },
    addSchoolExperience () {
      addExperience(this.experience).then(res => {
        this.resumeVO.schoolExperiences.push(res.data)
        this.schoolExperienceEditDialogVisible = false
        this.resetExperience()
      })
    },
    addSkill () {
      addSkill(this.skill).then(res => {
        this.resumeVO.skills.push(res.data)
        this.skillEditDialogVisible = false
        this.resetSkill()
      })
    },
    editEducationDialogOpen (education, index) {
      this.editOrAdd = 'edit'
      this.education.resumeId = education.resumeId
      this.education.awards = education.awards
      this.education.educationRank = education.educationRank
      this.education.start = education.start
      this.education.end = education.end
      this.education.school = education.school
      this.education.courses = education.courses
      this.education.gradeRank = education.gradeRank
      this.education.id = education.id
      this.education.profession = education.profession
      this.educationEditDialogVisible = true
      let startDate = new Date()
      startDate.setFullYear(this.education.start + 1, 0, 0)
      this.education.start = startDate
      let endDate = new Date()
      endDate.setFullYear(this.education.end + 1, 0, 0)
      this.education.end = endDate
      this.index = index
    },
    editPracticeExperienceDialogOpen (experience, index) {
      let key
      for (key in experience) {
        this.experience[key] = experience[key]
      }
      this.editOrAdd = 'edit'
      this.index = index
      this.practiceExperienceEditDialogVisible = true
    },
    editResearchExperienceDialogOpen (experience, index) {
      let key
      for (key in experience) {
        this.experience[key] = experience[key]
      }
      this.editOrAdd = 'edit'
      this.index = index
      this.researchExperienceEditDialogVisible = true
    },
    editSchoolExperienceDialogOpen (experience, index) {
      let key
      for (key in experience) {
        this.experience[key] = experience[key]
      }
      this.editOrAdd = 'edit'
      this.index = index
      this.schoolExperienceEditDialogVisible = true
    },
    editSkillDialogOpen (skill, index) {
      let key
      for (key in skill) {
        this.skill[key] = skill[key]
      }
      this.editOrAdd = 'edit'
      this.index = index
      this.skillEditDialogVisible = true
    },
    editResumeDialogOpen () {
      let key
      for (key in this.resume) {
        this.resume[key] = this.resumeVO.resume[key]
      }
      this.resumeEditDialogVisible = true
    },
    editEducation () {
      if (this.education.start instanceof Date) {
        this.education.start = this.education.start.getFullYear()
      }
      if (this.education.end instanceof Date) {
        this.education.end = this.education.end.getFullYear()
      }
      editEducation(this.education).then(res => {
        this.$set(this.resumeVO.educations, this.index, res.data)
        this.educationEditDialogVisible = false
        this.resetEducation()
      })
    },
    editPracticeExperience () {
      editExperience(this.experience).then(res => {
        this.$set(this.resumeVO.practiceExperiences, this.index, res.data)
        this.practiceExperienceEditDialogVisible = false
        this.resetExperience()
      })
    },
    editResearchExperience () {
      editExperience(this.experience).then(res => {
        this.$set(this.resumeVO.researchExperiences, this.index, res.data)
        this.researchExperienceEditDialogVisible = false
        this.resetExperience()
      })
    },
    editSchoolExperience () {
      editExperience(this.experience).then(res => {
        this.$set(this.resumeVO.schoolExperiences, this.index, res.data)
        this.schoolExperienceEditDialogVisible = false
        this.resetExperience()
      })
    },
    editSkill () {
      editSkill(this.skill).then(res => {
        this.$set(this.resumeVO.skills, this.index, res.data)
        this.skillEditDialogVisible = false
        this.resetSkill()
      })
    },
    deleteEducation (educationId, index) {
      deleteEducation(educationId).then(() => {
        this.resumeVO.educations.splice(index, 1)
      })
    },
    deletePracticeExperience (experienceId, index) {
      deleteExperience(experienceId).then(() => {
        this.resumeVO.practiceExperiences.splice(index, 1)
      })
    },
    deleteResearchExperience (experienceId, index) {
      deleteExperience(experienceId).then(() => {
        this.resumeVO.researchExperiences.splice(index, 1)
      })
    },
    deleteSchoolExperience (experienceId, index) {
      deleteExperience(experienceId).then(() => {
        this.resumeVO.schoolExperiences.splice(index, 1)
      })
    },
    deleteSkill (skillId, index) {
      deleteSkill(skillId).then(() => {
        this.resumeVO.skills.splice(index, 1)
      })
    },
    editResume () {
      editResume(this.resume).then(res => {
        this.resumeVO.resume = res.data
        this.resumeEditDialogVisible = false
        this.resumes.splice(this.resumeIndex, 1, res.data)
      })
    },
    handleResumeTypeDialogOpen () {
      this.chooseVisible = true
    },
    handleResumeTypeDialogClose () {
      this.chooseVisible = false
    },
    handleResumeAdd () {
      this.chooseVisible = false
      this.resetResume()
      this.resume.personInfoId = this.personInfo.id
      this.resume.resumeName = '简历' + (this.resumes.length + 1)
      this.resume.resumeType = 'TEMPLATE'
      addResume(this.resume).then(res => {
        this.resumes.push(res.data)
        this.handleEditDialogOpen(res.data.id, this.resumes.length, res.data.resumeType)
      })
    },
    handleDeleteResume (resumeId, index) {
      deleteResume(resumeId).then(() => {
        this.resumes.splice(index, 1)
      })
    }
  }
}
</script>

<style scoped>
  .person-center {
    width: 968px;
    width: 100%;
    text-align: center;
    position: absolute;
  }
  .header {
    height: 50px;
  }
  .main {
    margin-top: 20px;
    height: 1000px;
  }
  .person-info {
    width: 968px;
    left: 50%;
    margin-left: -480px;
    position: absolute;
  }
  .resume {
    margin-top: 380px;
    width: 968px;
    left: 50%;
    margin-left: -480px;
    position: absolute;
  }
  .job-box {
    margin-top: 800px;
    width: 1024px;
    left: 50%;
    margin-left: -480px;
    position: absolute;
  }
  .el-input {
    width: 50%;
  }
  .line {
    margin-left: 5px;
    margin-right: 5px;
    color: darkgray;
  }
  .card-content {
    text-align: left;
    margin-top: 10px;
  }
  .content-font {
    color: gray;
  }
</style>
