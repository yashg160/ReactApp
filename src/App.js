import React from 'react';
import NavBar from './components/NavBar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';



export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchBy: 'name',
            value: '',
            resp: null
        }
    }

    async getResponse() {

        let { searchBy, value } = this.state;
        searchBy = searchBy.toLowerCase();
        value = value.toLowerCase();
        
        let resp = await fetch(`http://127.0.0.1:3001/search?searchBy=${searchBy}&value=${value}`);
        resp = await resp.json();

        return resp;
    }

    handleSearchClick() {
        console.log('Called handleSearchClick. State:', this.state);

        this.setState({ loading: true, resp: null });
        this.getResponse()
            .then(response => {
                if (response.response.length == 0)
                    this.setState({ loading: false, resp: null });
                else
                    this.setState({ loading: false, resp: response });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.error(error);
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <NavBar />

                    <Grid container direction="row" justfiy="center" alignItems="center" style={{ marginTop: 40 }}>

                        <Grid container item alignItems="center" justify="center" xs={12} sm={6}>

                            <Grid container direction="column" justify="center" alignItems="center">
                                <FormControl direction="row">
                                    <FormLabel>Search by</FormLabel>
                                    <RadioGroup name="search" value={this.state.searchBy} onChange={event => this.setState({ searchBy: event.target.value })}>
                                        <FormControlLabel value="name" control={<Radio />} label="By Name" />
                                        <FormControlLabel value="course" control={<Radio />} label="By Course" />
                                    </RadioGroup>
                                </FormControl>

                                <TextField
                                    variant="outlined"
                                    label={this.state.searchBy === 'name' ? 'Name' : 'Course'}
                                    style={{ margin: 40 }}
                                    onChange={event => this.setState({ value: event.target.value })}
                                />

                                <Button
                                    disabled={this.state.value == ''}
                                    variant="contained"
                                    onClick={() => this.handleSearchClick()}
                                >
                                    Search
                            </Button>
                            </Grid>

                        </Grid>

                        <Grid container item alignItems="center" justify="center" xs={12} sm={6}>
                            <Grid container direction="column" alignItems="center">
                                <CircularProgress color="secondary" />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )
            
        }

        return (
            <div>
                <NavBar />

                <Grid container direction="row" justfiy="center" alignItems="center" style={{ marginTop: 40 }}>

                    <Grid container item alignItems="center" justify="center" xs={12} sm={6}>

                        <Grid container direction="column" justify="center" alignItems="center">
                            <FormControl direction="row">
                                <FormLabel>Search by</FormLabel>
                                <RadioGroup name="search" value={this.state.searchBy} onChange={event => this.setState({ searchBy: event.target.value })}>
                                    <FormControlLabel value="name" control={<Radio />} label="By Name" />
                                    <FormControlLabel value="course" control={<Radio />} label="By Course" />
                                </RadioGroup>
                            </FormControl>

                            <TextField
                                variant="outlined"
                                label={this.state.searchBy === 'name' ? 'Name' : 'Course'}
                                style={{ margin: 40 }}
                                onChange={event => this.setState({ value: event.target.value })}
                            />

                            <Button
                                disabled={this.state.value == ''}
                                variant="contained"
                                onClick={() => this.handleSearchClick()}
                            >
                                Search
                            </Button>
                        </Grid>
                        
                    </Grid>
                    
                    <Grid container item alignItems="flex-start" justify="center" xs={12} sm={6}>
                        
                        <Grid container direction="column" style={{ padding: 40 }}>
                            {this.state.resp == null ?
                                <Typography variant="h5" align="center">
                                    No results found
                                </Typography>
                                :
                                this.state.resp.response.map(tableRow => (
                                    <Paper depth={24} style={{ width: '75%', padding: 20, margin: 20 }}>
                                        <Typography variant="h5" component="h3" style={{ textTransform: 'capitalize' }}>
                                            {tableRow.name}
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            {tableRow.roll_no}
                                        </Typography>
                                    </Paper>
                                ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
    
}
