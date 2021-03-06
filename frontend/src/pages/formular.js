import Head from 'next/head';
import {useEffect} from 'react'
import { 
	Box, 
	Container, 
	Typography, 
	TextField, 
	Button,
} from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useRouter } from 'next/router'
import { useFormik } from 'formik';
import FormService from '../services/form.service'

const initialized = false;

const Formular = () => {
	const user = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('user') : null);
	const router = useRouter();
	const { id } = router.query;
	const emptyForm = {
		q11: '',
		q12: '',
		q13: '',
		q14: '',
		q21: '',
		q22: '',
		q23: '',
		q24: '',
		q31: '',
		q32: '',
		q33: '',
		q34: '',
		q41: '',
		q42: '',
		q43: '',
		q44: '',
		q51: '',
		q52: '',
		q53: '',
		q54: '',
	}
	
	useEffect(() => {
		if (!user) {
			router.push('/login')
		}
	})

	const formik = useFormik({
		initialValues: emptyForm,
		onSubmit: () => {
			const formular = Object.entries(formik.values).map(
				q => {
					let obj = {};
					obj[q[0]] = q[1].split(',').map(x => {
						const vals = x.split('-');
						return {
							text: vals[0].trim(),
							val: Number(vals[1])
						}
					})
					return obj;
				}
			).reduce(function(obj, v) {
				for (const prop in v) {
					obj[prop] = v[prop]
				}
				return obj;
			}, {})
			
			if (id) {
				FormService.updateForm(formular, id).then((res) => {
					if (res) {
						router.push('/')
					}
				})
			} else {
				FormService.addForm(formular).then((res) => {
					if (res) {
						router.push('/')
					}
				})
			}
		}
	});

	if (id && !initialized) {
		initialized = true
		FormService.getFormById(id).then(res => {
			for (const q in res) {
				if (res[q].reduce) {
					res[q] = res[q].reduce((question, curr) => {
						return `${question}${curr.text} - ${curr.val},`
					}, '')
				}
			}
			formik.setValues(res)
		})
	}
	
	return (
		<>
			<Head>
				<title>
					Formular | DAI
				</title>
			</Head>
			<Box
				component="main"
				sx={{
				flexGrow: 1,
				py: 8
				}}
			>
				<Container maxWidth={false}>
					<Typography
						sx={{ m: 1 }}
						variant="h4"
					>
						Fi???? autoevaluare
					</Typography>
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
							m: -1
						}}
					>
						<form onSubmit={formik.handleSubmit}>
							<Typography
								sx={{ m: 5 }}
								variant="h5"
							>
								I.EDUCA??IE
							</Typography>
							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
									Carte ??i capitole ??n carte de specialitate, publicat?? ??n editur?? str??in?? (NU proceedings, tipul "Capitol de carte" dovedit) (Autori, denumire, editur??, num??r pagini)

								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q11} 
									fullWidth
									name="q11"
									margin="normal"
									variant="outlined"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
									Carte ??i capitole ??n carte de specialitate, publicat?? ??n editur?? na??ional?? recunoscut?? CNCSIS (NU proceedings, tipul "Capitol de carte" dovedit) (Autori, denumire, editur??, COD CNCSIS, num??r pagini)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q12} 
									fullWidth
									name="q12"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
									Carte ??i capitole ??n carte de specialitate, ca editor/coordonator publicat?? ??n editur?? str??in?? 
									(NU proceedings, tipul "Capitol de carte" dovedit)
									(Autori, denumire, editur??, COD CNCSIS, num??r pagini)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q13} 
									fullWidth
									name="q13"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
									Carte ??i capitole ??n carte de specialitate, ca editor/coordonator publicat?? ??n editur?? na??ional?? recunoscut?? CNCSIS 
									(Autori, denumire, editur??, COD CNCSIS, num??r pagini)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q14} 
									fullWidth
									name="q14"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Typography
								sx={{ m: 5 }}
								variant="h5"
							>
								II.CERCETARE
							</Typography>
							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
									Articole publicate ??n reviste WOS (Web of Science) din zona ro??ie/galben?? (Q1/Q2) 
									(Autori, denumire, editur??, num??r pagini, an publicare, num??r acces, WOS (valabil?? ??n anul public??rii lucr??rii), factor de impact ??n anul evalu??rii)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q21} 
									fullWidth
									name="q21"
									margin="normal"
									variant="outlined"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Articole publicate ??n reviste cotate WOS (Web of Science)
(Autori, denumire, editur??, num??r pagini, an publicare, num??r acces, WOS (valabil?? ??n anul public??rii lucr??rii), factor de impact ??n anul evalu??rii)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q22} 
									fullWidth
									name="q22"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Articole publicate ??n reviste indexate ??n alte BDI reprezentative pentru domeniu
(Autori, titlu articol, revista, num??r, an, pagini, baza date)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q23} 
									fullWidth
									name="q23"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Articole publicate ??n volumele unor manifest??ri ??tiin??ifice indexate WOS (Web of Science)
(Autori, titlu articol, an, pagini, num??r acces WOS)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q24} 
									fullWidth
									name="q24"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Typography
								sx={{ m: 5 }}
								variant="h5"
							>
								III.MANAGEMENT UNIVERSITAR
							</Typography>
							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Pre??edinte al comisiei de admitere licen????/masterat sau al comisiei de sus??inere a examenului de absolvire licen????/masterat
(denumire comisie, sesiune, an)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q31} 
									fullWidth
									name="q31"
									margin="normal"
									variant="outlined"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Membru ??n comisia de admitere licen????/masterat sau ??n comisia de sus??inere a examenului de absolvire licen????/masterat
(denumire comisie, sesiune, an)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q32} 
									fullWidth
									name="q32"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Coordonator program de studii licen???? / masterat / postuniversitar
(Denumire program, licen????/masterat)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q33} 
									fullWidth
									name="q33"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Director de laborator didactic/cercetare
(Nume Laborator, didactic/de cercetare, sala)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q34} 
									fullWidth
									name="q34"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Typography
								sx={{ m: 5 }}
								variant="h5"
							>
								IV.RECUNOA??TERE ACADEMIC?? - PRESTIGIU UNIVERSITAR
							</Typography>
							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Membru ??n Academia Rom??n??
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q41} 
									fullWidth
									name="q41"
									margin="normal"
									variant="outlined"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Membru ??n academii de profil organizate conform legii : ASTR, AOSR, ASM, ASAMV, altele
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q42} 
									fullWidth
									name="q42"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Pre??edinte/Membru ??n organiza??ie ??tiin??ific??/profesional?? interna??ional?? 
(Denumire organiza??ie)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q43} 
									fullWidth
									name="q43"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Pre??edinte/Membru ??n organiza??ie ??tiin??ific??/profesional?? na??ional?? 
(Denumire organiza??ie)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q44} 
									fullWidth
									name="q44"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Typography
								sx={{ m: 5 }}
								variant="h5"
							>
								V.ACTIVIT????I ??N CADRUL COMUNIT????II ACADEMICE ??I A MEDIULUI SOCIO - ECONOMIC
							</Typography>
							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Lucrare prezentat?? ??n plen, la manifestari ??tiin??ifice interna??ionale/na??ionale (invitat special ??n plen, key-note speaker) 
(denumire manifestare, pozi??ia lucr??rii ??n programul manifesta??iei)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q51} 
									fullWidth
									name="q51"
									margin="normal"
									variant="outlined"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Profesor invitat la o alt?? universitate din str??in??tate/Rom??nia Exclusiv ERASMUS
(universitate, perioada - minim 2 s??pt??m??ni)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q52} 
									fullWidth
									name="q52"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Membru ??n colectivul de redac??ie al unei reviste ??tiin??ifice interna??ional??/na??ional?? indexat?? WOS
(denumire revist??)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q53} 
									fullWidth
									name="q53"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>

							<Box sx={{ my: 3 }}>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="body2"
								>
Membru ??n colectivul de redac??ie al unei reviste ??tiin??ifice interna??ional??/na??ional?? indexat?? ??n BDI 
(denumire revist??, denumire BDI)
								</Typography>
								<TextField 
									required
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.q54} 
									fullWidth
									name="q54"
									placeholder="Titlu1 - 30; Titlu2 - 20 etc."
									margin="normal"
									variant="outlined"
								/>
							</Box>
							
							<Button 
								variant="raised"
								disabled={formik.isSubmitting}
								size="large"
								type="submit"
								variant="contained"
							>
								Trimite
							</Button>
						</form>	
					</Box>
				</Container>
			</Box>
		</>
	);
}

Formular.getLayout = (page) => (
	<DashboardLayout>
		{page}
	</DashboardLayout>
);

export default Formular;
