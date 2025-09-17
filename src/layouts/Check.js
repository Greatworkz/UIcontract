 <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box mb={3}>
                  <CardSection
                    title="Issue | Risk | Cost Recovery | Action Plan | Audit Recommendations"
                    showArrow
                  >
                    {/* <Box sx={{display:'grid'}}> */}

                    <Grid container spacing={4}>
                      {/* --- Group 1: Radio Groups --- */}
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {/* Radio 1 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Observation | Issue Indicator (Y/N)
                            </Typography>
                            <RadioGroup
                              row
                              value={formData.issueIndicator}
                              onChange={handleRadioChange("issueIndicator")}
                              sx={{ gap: 2 }}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio size="small" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio size="small" />}
                                label="No"
                              />
                            </RadioGroup>
                          </Box>

                          {/* Radio 2 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Observation | Risk Indicator (Y/N)
                            </Typography>
                            <RadioGroup
                              row
                              value={formData.riskIndicator}
                              onChange={handleRadioChange("riskIndicator")}
                              sx={{ gap: 2 }}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio size="small" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio size="small" />}
                                label="No"
                              />
                            </RadioGroup>
                          </Box>

                          {/* Radio 3 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Observation | Cost Recovery Indicator (Y/N)
                            </Typography>
                            <RadioGroup
                              row
                              value={formData.costRecoveryIndicator}
                              onChange={handleRadioChange(
                                "costRecoveryIndicator"
                              )}
                              sx={{ gap: 2 }}
                            >
                              <FormControlLabel
                                value="yes"
                                control={<Radio size="small" />}
                                label="Yes"
                              />
                              <FormControlLabel
                                value="no"
                                control={<Radio size="small" />}
                                label="No"
                              />
                            </RadioGroup>
                          </Box>
                        </Box>
                      </Grid>

                      {/* --- Group 2: Date Pickers --- */}
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {/* Date Picker 1 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Observation Due Date
                            </Typography>
                            <DatePicker
                              value={formData.observationDueDate}
                              onChange={handleDateChange("observationDueDate")}
                              slotProps={{
                                textField: { size: "small", fullWidth: false },
                              }}
                            />
                          </Box>

                          {/* Date Picker 2 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Expected Action Plan Closure Date
                            </Typography>
                            <DatePicker
                              value={formData.expectedActionPlanDate}
                              onChange={handleDateChange(
                                "expectedActionPlanDate"
                              )}
                              slotProps={{
                                textField: { size: "small", fullWidth: false },
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>

                      {/* --- Group 3: Text Areas --- */}
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {/* TextArea 1 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Issue | Risk Mitigation Action Plan
                            </Typography>
                            <TextField
                              multiline
                              rows={4}
                              fullWidth
                              value={formData.issueMitigationPlan}
                              onChange={handleTextChange("issueMitigationPlan")}
                            />
                          </Box>

                          {/* TextArea 2 */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 3,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                fontWeight: 500,
                                minWidth: "280px",
                              }}
                            >
                              Audit Recommendations
                            </Typography>
                            <TextField
                              multiline
                              rows={4}
                              fullWidth
                              value={formData.auditRecommendations}
                              onChange={handleTextChange(
                                "auditRecommendations"
                              )}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* </Box> */}
                  </CardSection>
                </Box>
              </LocalizationProvider>